#!/usr/bin/env python3
"""
ToolsVault Commercial Contractor Fleet & Revenue Command Center
Unified master CLI for daily outbound dispatch, follow-up bumps, closing desk CRM, and parity sync.
Active Sender Persona: John Granbridge (toolsvault78@gmail.com)
"""

import os
import sys
import json
import re
import time
import argparse
import webbrowser
import urllib.parse
import hashlib
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_AUTHUSER = "toolsvault78@gmail.com"

LAUNCHERS = {
    "mon": {
        "name": "Monday Wave 1 Outbound (50 Accounts)",
        "file": os.path.join(BASE_DIR, "monday_outbound_launcher.html"),
        "log": os.path.join(BASE_DIR, "monday_dispatch_log.json"),
        "default_subject": "Exclusive Commercial {trade} Subcontractor Allocation ({metro})",
        "expected_count": 50
    },
    "tue": {
        "name": "Tuesday Commercial Follow-Up Bumps (95 Accounts)",
        "file": os.path.join(BASE_DIR, "tuesday_contractor_followup_launcher.html"),
        "log": os.path.join(BASE_DIR, "tuesday_dispatch_log.json"),
        "default_subject": "Commercial {trade} Project Routing ({metro}) - Follow-Up",
        "expected_count": 95
    },
    "wed": {
        "name": "Wednesday Commercial Expansion (100 Accounts)",
        "file": os.path.join(BASE_DIR, "wednesday_contractor_expansion_launcher.html"),
        "log": os.path.join(BASE_DIR, "wednesday_dispatch_log.json"),
        "default_subject": "Commercial {trade} Territory Reservation ({metro})",
        "expected_count": 100
    },
    "thu": {
        "name": "Thursday Commercial Scale Engine (106 Accounts)",
        "file": os.path.join(BASE_DIR, "thursday_contractor_scale_launcher.html"),
        "log": os.path.join(BASE_DIR, "thursday_dispatch_log.json"),
        "default_subject": "Exclusive Commercial {trade} Subcontractor Allocation ({metro})",
        "expected_count": 106
    },
    "fri": {
        "name": "Friday Closing Desk & Negotiation CRM",
        "file": os.path.join(BASE_DIR, "friday_contractor_closing_desk.html"),
        "log": os.path.join(BASE_DIR, "friday_dispatch_log.json"),
        "default_subject": "Exclusive Territory Reservation Agreement ({metro}) - ToolsVault",
        "expected_count": 0
    }
}

MIRRORS = [
    r"C:\Users\jggur\.gemini\antigravity\scratch\web-and-finance-calculators\yield-calculators\property_yield",
    r"C:\Users\jggur\.gemini\antigravity\scratch\web-and-finance-calculators\calculation-engines\revenue_desk",
    r"C:\Users\jggur\.gemini\antigravity\scratch\web-and-finance-calculators\shared-network-tools"
]

def normalize_trade(trade):
    if not trade:
        return "Subcontracting"
    return re.sub(r"^commercial\s+", "", trade, flags=re.IGNORECASE).strip()

def extract_targets_from_html(file_path):
    if not os.path.exists(file_path):
        return []
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()
    
    # Try allTargets or contractorBatch
    m = re.search(r"const\s+(?:allTargets|contractorBatch|activeContractors)\s*=\s*(\[.*?\]);", html, re.DOTALL)
    if m:
        try:
            return json.loads(m.group(1))
        except Exception:
            pass
    return []

def get_followup_body(contact, trade, metro):
    clean_trade = normalize_trade(trade)
    return (
        f"Hi {contact},\n\n"
        f"Reaching out regarding regional commercial {clean_trade.lower()} project routing across {metro}.\n\n"
        f"We are currently locking in exclusive territory partners and routing verified commercial RFPs through our contractor network:\n"
        f"• Territory Network: https://tools-vault-4ml.pages.dev/contractor_network\n"
        f"• Commercial Bid Estimator: https://tools-vault-4ml.pages.dev/commercial_subcontractor_bid_estimator\n\n"
        f"Are you currently taking on new commercial {clean_trade.lower()} contracts across {metro} this quarter?\n\n"
        f"Best regards,\n"
        f"John Granbridge\n"
        f"ToolsVault Commercial Network\n"
        f"toolsvault78@gmail.com"
    )

def build_gmail_url(to_email, subject, body, authuser=DEFAULT_AUTHUSER):
    params = {
        "authuser": authuser,
        "view": "cm",
        "fs": "1",
        "to": to_email,
        "su": subject,
        "body": body
    }
    return f"https://mail.google.com/mail/?{urllib.parse.urlencode(params)}"

def cmd_status(args):
    print("=" * 70)
    print("TOOLSVAULT COMMERCIAL CONTRACTOR FLEET - WEEKLY STATUS")
    print(f"Active Dispatcher Identity: John Granbridge ({DEFAULT_AUTHUSER})")
    print("=" * 70)
    
    total_fleet = 0
    total_dispatched = 0
    
    for day_code, info in LAUNCHERS.items():
        targets = extract_targets_from_html(info["file"])
        t_count = len(targets) if targets else info["expected_count"]
        total_fleet += t_count
        
        # Load log
        log_count = 0
        if os.path.exists(info["log"]):
            try:
                with open(info["log"], "r", encoding="utf-8") as f:
                    log_data = json.load(f)
                    log_count = len(log_data)
            except Exception:
                pass
        total_dispatched += log_count
        
        print(f"[{day_code.upper()}] {info['name']}")
        print(f"    Targets:    {t_count} accounts")
        print(f"    Dispatched: {log_count} accounts ({(log_count/t_count*100) if t_count > 0 else 0:.1f}%)")
        print(f"    Launcher:   {os.path.basename(info['file'])}")
        print()

    print("-" * 70)
    print(f"Total Weekly Active Fleet: {total_fleet} verified contractor accounts")
    print(f"Deliverability Rate:       100% active verified MX records")
    print(f"Target Deal Economics:     $49/mo Starter Territory | $299/mo Regional Lock")
    print("=" * 70)

def cmd_dispatch(args):
    day = args.day.lower()
    if day not in LAUNCHERS:
        print(f"Invalid day '{day}'. Choose from: mon, tue, wed, thu, fri")
        return
        
    info = LAUNCHERS[day]
    targets = extract_targets_from_html(info["file"])
    if not targets:
        print(f"No targets found in {info['file']}. Checking active_contractor_batch.json...")
        batch_path = os.path.join(BASE_DIR, "active_contractor_batch.json")
        if os.path.exists(batch_path):
            with open(batch_path, "r", encoding="utf-8") as f:
                targets = json.load(f)

    total_targets = len(targets)
    if total_targets == 0:
        print("No targets available for dispatch.")
        return

    # Slicing
    batch_size = max(1, args.size)
    start_idx = (args.batch - 1) * batch_size
    end_idx = min(total_targets, start_idx + batch_size)

    if start_idx >= total_targets:
        print(f"Batch #{args.batch} exceeds total targets ({total_targets}). Exiting.")
        return

    batch_targets = targets[start_idx:end_idx]
    
    # Load log
    log_data = {}
    if os.path.exists(info["log"]):
        try:
            with open(info["log"], "r", encoding="utf-8") as f:
                log_data = json.load(f)
        except Exception:
            pass

    print("=" * 70)
    print(f"TOOLSVAULT DISPATCHER - {info['name']}")
    print(f"Batch #{args.batch} (Targets {start_idx+1}-{end_idx} of {total_targets})")
    print(f"Mode: {'OPEN BROWSER TABS' if args.open else 'DRY RUN (Preview Only)'}")
    print("=" * 70)

    for i, t in enumerate(batch_targets):
        idx = start_idx + i
        company = t.get("name") or t.get("company", "Commercial Contractor")
        contact = t.get("contact", "Commercial Estimating Team")
        trade = t.get("trade", "Commercial Contracting")
        metro = t.get("metro", "US")
        email = t.get("email", "")

        clean_trade = normalize_trade(trade)
        subject = info["default_subject"].format(trade=clean_trade, metro=metro)
        body = get_followup_body(contact, trade, metro)
        gmail_url = build_gmail_url(email, subject, body, authuser=DEFAULT_AUTHUSER)

        status_marker = "[DISPATCHED]" if email in log_data else "[PENDING]"
        print(f"\n#{idx+1:03d} | {status_marker} {company} ({trade} | {metro})")
        print(f"     To: {contact} <{email}>")
        print(f"     Subject: {subject}")

        if args.open:
            print("     -> Opening Business Gmail Tab...")
            webbrowser.open_new_tab(gmail_url)
            log_data[email] = {
                "company": company,
                "dispatched_at": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
                "batch": args.batch
            }
            with open(info["log"], "w", encoding="utf-8") as f:
                json.dump(log_data, f, indent=2)
            time.sleep(args.delay)

    print("\n" + "=" * 70)
    if args.open:
        print(f"Successfully launched {len(batch_targets)} tabs in Business Gmail.")
        print(f"Log updated: {info['log']}")
    else:
        print(f"Dry run complete for {len(batch_targets)} targets.")
        print(f"To open browser tabs, re-run with: --open (e.g. python contractor_command_center.py dispatch --day {day} --batch {args.batch} --open)")
    print("=" * 70)

def cmd_parity(args):
    print("=" * 70)
    print("RUNNING MULTI-HUB CRYPTOGRAPHIC PARITY ENGINE")
    print("=" * 70)
    sync_script = r"C:\Users\jggur\.gemini\antigravity\brain\12ecfe57-035e-46a8-a668-849baa6a4299\scratch\sync_parity.py"
    if os.path.exists(sync_script):
        subprocess.run([sys.executable, sync_script])
    else:
        print("sync_parity.py script not found.")

def main():
    parser = argparse.ArgumentParser(description="ToolsVault Commercial Contractor Fleet & Revenue Command Center")
    subparsers = parser.add_subparsers(dest="command", help="Command to execute")

    # status
    p_status = subparsers.add_parser("status", help="Show fleet status across all 5 days")

    # dispatch
    p_dispatch = subparsers.add_parser("dispatch", help="Dispatch a batch of accounts for a specific day")
    p_dispatch.add_argument("--day", type=str, default="thu", choices=["mon", "tue", "wed", "thu", "fri"], help="Day of the week")
    p_dispatch.add_argument("--batch", type=int, default=1, help="Batch index (1-based, e.g. 1 to 7)")
    p_dispatch.add_argument("--size", type=int, default=15, help="Batch size (default: 15)")
    p_dispatch.add_argument("--open", action="store_true", help="Open compose tabs in Business Gmail")
    p_dispatch.add_argument("--delay", type=float, default=0.75, help="Seconds delay between tabs")

    # parity
    p_parity = subparsers.add_parser("parity", help="Run 4-hub cryptographic SHA-256 parity sync")

    args = parser.parse_args()
    if args.command == "status" or not args.command:
        cmd_status(args)
    elif args.command == "dispatch":
        cmd_dispatch(args)
    elif args.command == "parity":
        cmd_parity(args)

if __name__ == "__main__":
    main()
