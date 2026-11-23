"""Generate SAMPLE hotel and flight datasets for Yatra.
All names, prices and schedules are synthetic (seeded, so repeatable).
Replace with a real source (Amadeus, Booking, etc.) for production.
Run:  python generate_data.py
"""
import csv, math, random

random.seed(42)

# city, state, airport code, lat, lng, price multiplier, local flavour words, areas
CITIES = [
 ("Delhi","Delhi","DEL",28.61,77.21,1.2,["Capital","Lutyens","Mughal","Chandni"],["Connaught Place","Paharganj","Aerocity","Hauz Khas"]),
 ("Mumbai","Maharashtra","BOM",19.08,72.88,1.4,["Marine","Gateway","Bandra","Sea Link"],["Colaba","Juhu","Bandra West","Andheri East"]),
 ("Bengaluru","Karnataka","BLR",12.97,77.59,1.1,["Garden","Lalbagh","Cubbon","Silicon"],["MG Road","Indiranagar","Koramangala","Whitefield"]),
 ("Chennai","Tamil Nadu","MAA",13.08,80.27,1.0,["Marina","Kapali","Coromandel","Madras"],["T Nagar","Mylapore","Egmore","ECR"]),
 ("Kolkata","West Bengal","CCU",22.57,88.36,0.9,["Howrah","Hooghly","Victoria","Bengal"],["Park Street","Salt Lake","Ballygunge","New Town"]),
 ("Hyderabad","Telangana","HYD",17.39,78.49,1.0,["Nizam","Charminar","Deccan","Pearl"],["Banjara Hills","Hitech City","Abids","Jubilee Hills"]),
 ("Goa","Goa","GOI",15.30,74.12,1.3,["Palm","Sunset","Feni","Coconut"],["Calangute","Baga","Panjim","Palolem"]),
 ("Jaipur","Rajasthan","JAI",26.91,75.79,1.0,["Pink City","Amber","Rajputana","Haveli"],["C-Scheme","Civil Lines","Bani Park","Amer Road"]),
 ("Manali","Himachal Pradesh","KUU",32.24,77.19,0.95,["Pine","Himalayan","Beas","Snowline"],["Old Manali","Mall Road","Vashisht","Solang Valley"]),
 ("Kochi","Kerala","COK",9.93,76.27,0.95,["Fort","Malabar","Spice","Chinese Net"],["Fort Kochi","Marine Drive","Edappally","Mattancherry"]),
 ("Alleppey","Kerala","COK",9.49,76.34,1.0,["Backwater","Kettuvallam","Lagoon","Coir"],["Punnamada","Beach Road","Kumarakom Rd","Finishing Point"]),
 ("Udaipur","Rajasthan","UDR",24.58,73.71,1.1,["Lake","Pichola","Mewar","Jag Mandir"],["Lake Pichola","Fateh Sagar","City Palace Rd","Saheliyon Ki Bari"]),
 ("Varanasi","Uttar Pradesh","VNS",25.32,83.01,0.8,["Ganga","Ghat","Kashi","Assi"],["Assi Ghat","Dashashwamedh","Cantt","Sigra"]),
 ("Srinagar","Jammu & Kashmir","SXR",34.08,74.80,1.0,["Dal","Chinar","Shikara","Kashmir"],["Dal Lake","Boulevard Road","Rajbagh","Nigeen"]),
 ("Leh","Ladakh","IXL",34.16,77.58,1.25,["Indus","Stok","Zanskar","Ladakh"],["Main Bazaar","Changspa","Fort Road","Sankar"]),
 ("Rishikesh","Uttarakhand","DED",30.09,78.27,0.8,["Ganga","Laxman","Yoga","Rapids"],["Tapovan","Laxman Jhula","Ram Jhula","Muni Ki Reti"]),
 ("Darjeeling","West Bengal","IXB",27.04,88.26,0.9,["Tea","Kanchenjunga","Toy Train","Mist"],["The Mall","Chowrasta","Ghoom","Lebong"]),
 ("Shimla","Himachal Pradesh","KUU",31.10,77.17,0.95,["Ridge","Colonial","Deodar","Kufri"],["The Mall","Lakkar Bazaar","Chotta Shimla","Sanjauli"]),
 ("Pune","Maharashtra","PNQ",18.52,73.86,1.0,["Peshwa","Sahyadri","Shaniwar","Deccan"],["Koregaon Park","Kalyani Nagar","Camp","Baner"]),
 ("Ahmedabad","Gujarat","AMD",23.02,72.57,0.9,["Sabarmati","Heritage","Navrang","Pol"],["Navrangpura","CG Road","Old City","SG Highway"]),
 ("Amritsar","Punjab","ATQ",31.63,74.87,0.85,["Golden","Sarovar","Punjab","Wagah"],["Golden Temple Rd","Ranjit Avenue","Mall Road","Lawrence Rd"]),
 ("Port Blair","Andaman & Nicobar","IXZ",11.62,92.73,1.35,["Coral","Andaman","Lagoon","Island"],["Aberdeen Bazaar","Corbyn's Cove","Haddo","Havelock Rd"]),
]

# ---------------------------------------------------------------- hotels
TIERS = {
 "budget":   dict(types=["Hostel","Homestay","Budget Hotel","Guest House"], price=(700,2200),  stars=(1,3), amen=["WiFi","Fan","Breakfast","Common Kitchen","Luggage Storage"]),
 "moderate": dict(types=["Hotel","Boutique Hotel","Resort","Heritage Stay"], price=(2500,6500), stars=(3,4), amen=["WiFi","AC","Breakfast","Restaurant","Parking","Room Service"]),
 "luxury":   dict(types=["Luxury Hotel","Luxury Resort","Palace Hotel","Spa Resort"], price=(9000,28000), stars=(5,5), amen=["WiFi","AC","Pool","Spa","Fine Dining","Airport Pickup","Concierge","Gym"]),
}
SUFFIX = {"Hostel":"Backpackers","Homestay":"Homestay","Budget Hotel":"Inn","Guest House":"Guest House",
          "Hotel":"Hotel","Boutique Hotel":"Boutique","Resort":"Resort","Heritage Stay":"Haveli",
          "Luxury Hotel":"Grand","Luxury Resort":"Retreat","Palace Hotel":"Palace","Spa Resort":"Spa & Resort"}

hotels = []
for city, state, code, lat, lng, mult, words, areas in CITIES:
    plan = ["budget"]*3 + ["moderate"]*3 + ["luxury"]*2
    used = set()
    for tier in plan:
        t = TIERS[tier]
        htype = random.choice(t["types"])
        while True:
            name = f"{random.choice(words)} {random.choice(['View','Court','Residency','Palms','Orchid','Crest','Terrace','Gardens'])} {SUFFIX[htype]}"
            if name not in used: used.add(name); break
        price = round(random.uniform(*t["price"]) * mult / 50) * 50
        stars = random.randint(*t["stars"])
        rating = round(min(5, max(3.0, random.gauss({"budget":3.9,"moderate":4.2,"luxury":4.6}[tier], .25))), 1)
        amen = random.sample(t["amen"], k=min(len(t["amen"]), random.randint(3, 5)))
        hotels.append({
            "hotel_id": f"H{len(hotels)+1:04d}", "name": name, "city": city, "state": state,
            "nearest_airport": code, "area": random.choice(areas), "category": tier, "type": htype,
            "star_rating": stars, "guest_rating": rating, "reviews_count": random.randint(40, 4200),
            "price_per_night_inr": price, "amenities": "|".join(amen),
            "free_cancellation": random.choice([True, True, False]),
            "veg_friendly": random.choice([True, True, True, False]),
            "latitude": round(lat + random.uniform(-.03, .03), 5), "longitude": round(lng + random.uniform(-.03, .03), 5),
        })

with open("hotels.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=hotels[0].keys()); w.writeheader(); w.writerows(hotels)

# --------------------------------------------------------------- flights
AIRPORTS = {}
for city, state, code, lat, lng, *_ in CITIES:
    AIRPORTS.setdefault(code, (city if city not in ("Alleppey","Shimla") else {"COK":"Kochi","KUU":"Manali"}[code], lat, lng))
AIRPORTS["KUU"] = ("Manali", 32.24, 77.19)   # Bhuntar (Kullu-Manali) serves Manali/Shimla trips
AIRPORTS["COK"] = ("Kochi", 9.93, 76.27)     # serves Kochi/Alleppey

LIMITED = {"KUU":["DEL"],"IXL":["DEL"],"DED":["DEL"],"IXZ":["DEL","CCU","MAA","BLR"],"IXB":["DEL","CCU"],
           "SXR":["DEL","BOM"],"UDR":["DEL","BOM","BLR"],"VNS":["DEL","BOM","BLR","CCU","HYD"],"ATQ":["DEL","BOM","BLR"]}
AIRLINES = [("IndiGo","6E"),("Air India","AI"),("Vistara","UK"),("SpiceJet","SG"),("Akasa Air","QP"),("Air India Express","IX")]
DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

def km(a, b):
    p1, l1, p2, l2 = map(math.radians, (a[1], a[2], b[1], b[2]))
    h = math.sin((p2-p1)/2)**2 + math.cos(p1)*math.cos(p2)*math.sin((l2-l1)/2)**2
    return 6371*2*math.asin(math.sqrt(h))

def allowed(a, b):
    if a in LIMITED and b not in LIMITED[a]: return False
    if b in LIMITED and a not in LIMITED[b]: return False
    return True

flights = []
for o in AIRPORTS:
    for d in AIRPORTS:
        if o == d or not allowed(o, d): continue
        dist = km(AIRPORTS[o], AIRPORTS[d])
        for _ in range(3):
            airline, iata = random.choice(AIRLINES)
            stops = 0 if random.random() < .85 else 1
            dur = int(dist/720*60 + 45 + stops*random.randint(70, 130))
            hh, mm = random.choice(range(5, 23)), random.choice([0, 10, 25, 40, 55])
            dep = hh*60 + mm; arr = (dep + dur) % 1440
            price = (1800 + dist*4.6) * random.uniform(.8, 1.45) * (1.12 if airline in ("Air India","Vistara") else 1) * (.92 if stops else 1)
            flights.append({
                "flight_id": f"F{len(flights)+1:05d}", "airline": airline, "flight_no": f"{iata}{random.randint(100, 9899)}",
                "origin_city": AIRPORTS[o][0], "origin_code": o, "destination_city": AIRPORTS[d][0], "destination_code": d,
                "departure_time": f"{dep//60:02d}:{dep%60:02d}", "arrival_time": f"{arr//60:02d}:{arr%60:02d}",
                "next_day_arrival": dep + dur >= 1440, "duration_min": dur, "stops": stops, "distance_km": round(dist),
                "economy_price_inr": int(round(price/10)*10), "business_price_inr": int(round(price*2.6/10)*10),
                "baggage_kg": random.choice([15, 15, 20, 25]), "days_of_week": "|".join(sorted(random.sample(DAYS, random.randint(4, 7)), key=DAYS.index)),
            })

with open("flights.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=flights[0].keys()); w.writeheader(); w.writerows(flights)

print(f"hotels.csv: {len(hotels)} rows across {len(CITIES)} destinations")
print(f"flights.csv: {len(flights)} rows across {len({(f['origin_code'], f['destination_code']) for f in flights})} routes, {len(AIRPORTS)} airports")
