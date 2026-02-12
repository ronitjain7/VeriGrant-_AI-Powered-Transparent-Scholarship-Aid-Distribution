import requests
import time
import sys

BASE_URL = "http://localhost:8000"

def log(msg):
    print(f"[TEST] {msg}")

def verify_backend():
    # 1. Check Health
    try:
        r = requests.get(f"{BASE_URL}/")
        if r.status_code == 200:
            log("✅ Backend is Online")
        else:
            log(f"❌ Backend returned {r.status_code}")
            return
    except Exception as e:
        log(f"❌ Backend connection failed: {e}")
        return

    # 2. Submit Application
    payload = {
        "fullName": "Demo Student",
        "email": "demo@example.com",
        "walletAddress": "DEMO_WALLET_123",
        "gpa": 3.9,
        "familyIncome": 25000,
        "essay": "This is a demo essay for verification."
    }
    log("...Submitting Application")
    r = requests.post(f"{BASE_URL}/submit", json=payload)
    if r.status_code == 200:
        data = r.json()
        log(f"✅ Application Submitted. Score: {data['score']}")
    else:
        log(f"❌ Submit failed: {r.text}")
        return

    # 3. Verify in Admin List
    log("...Checking Admin List")
    r = requests.get(f"{BASE_URL}/applicants")
    applicants = r.json()
    found = any(app['walletAddress'] == "DEMO_WALLET_123" for app in applicants)
    if found:
        log("✅ Applicant found in Admin Database")
    else:
        log("❌ Applicant NOT found")
        return

    # 4. Trigger Payout
    log("...Triggering Payout (Simulated)")
    r = requests.post(f"{BASE_URL}/payout")
    if r.status_code == 200:
        data = r.json()
        tx_id = data.get('txId')
        log(f"✅ Payout Success. TxID: {tx_id}")
    else:
        log(f"❌ Payout failed: {r.text}")

    # 5. Verify Audit Log
    log("...Checking Public Audit Log")
    r = requests.get(f"{BASE_URL}/transactions")
    txs = r.json()
    if len(txs) > 0:
        log(f"✅ Audit Log contains {len(txs)} transactions.")
        log("✅ Full Flow Verified Successfully!")
    else:
        log("❌ Audit Log is empty!")

if __name__ == "__main__":
    verify_backend()
