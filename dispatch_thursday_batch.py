#!/usr/bin/env python3
"""
ToolsVault Thursday Contractor Scale Engine - CLI Batch Dispatcher
Automates pre-populating and queueing Business Gmail compose tabs for the 106-account Thursday Wave.
Default Sender: John Granbridge (toolsvault78@gmail.com)
"""

import os
import sys
import json
import re
import time
import urllib.parse
import webbrowser
import argparse

MASTER_HUB = r"C:\Users\jggur\OneDrive\Desktop\ONE_DROP_MASTER_EMPIRE\command"
LAUNCHER_PATH = os.path.join(MASTER_HUB, "thursday_contractor_scale_launcher.html")
LOG_PATH = os.path.join(MASTER_HUB, "thursday_dispatch_log.json")
DEFAULT_AUTHUSER = "toolsvault78@gmail.com"

def normalize_trade(trade):
    if not trade:
        return "Subcontracting"
    return re.sub(r"^commercial\s+", "", trade, flags=re.IGNORECASE).strip()

def get_followup_subject(trade, metro):
    clean_trade = normalize_trade(trade)
    return f"Exclusive Commercial {clean_trade} Subcontractor Allocation ({metro})"

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

def load_targets():
    if not os.path.exists(LAUNCHER_PATH):
        raise FileNotFoundError(f"Launcher not found at {LAUNCHER_PATH}")
    
    with open(LAUNCHER_PATH, "r", encoding="utf-8") as f:
        html = f.read()
    
    m = re.search(r"const\s+allTargets\s*=\s*(\[.*?\]);", html, re.DOTALL)
    if not m:
        raise ValueError("Could not extract allTargets array from launcher HTML")
    
    targets = json.loads(m.group(1))
    return targets

def load_dispatch_log():
    if os.path.exists(LOG_PATH):
        try:
            with open(LOG_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_dispatch_log(log_data):
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        json.dump(log_data, f, indent=2)

def main():
    parser = argparse.ArgumentParser(description="ToolsVault Thursday Contractor Scale Engine - CLI Batch Dispatcher")
    parser.add_argument("--batch", type=int, default=1, help="Batch number (1-based index, e.g., 1 to 7)")
    parser.add_argument("--size", type=int, default=15, help="Batch size (default: 15)")
    parser.add_argument("--start", type=int, default=None, help="Custom start index (0-based)")
    parser.add_argument("--end", type=int, default=None, help="Custom end index (0-based, non-inclusive)")
    parser.add_argument("--authuser", type=str, default=DEFAULT_AUTHUSER, help="Gmail authuser email")
    parser.add_argument("--dry-run", action="store_true", help="Print table and links without opening browser tabs")
    parser.add_argument("--open", action="store_true", help="Open tabs in browser with pacing delay")
    parser.add_argument("--delay", type=float, default=0.75, help="Seconds delay between opening tabs (default: 0.75)")
    parser.add_argument("--status", action="store_true", help="Display dispatch progress across all 106 targets")
    args = parser.parse_args()

    targets = load_targets()
    total_targets = len(targets)
    log_data = load_dispatch_log()

    if args.status:
        dispatched_count = sum(1 for t in targets if t["email"] in log_data)
        print("=" * 60)
        print("TOOLSVAULT THURSDAY CONTRACTOR SCALE STATUS")
        print("=" * 60)
        print(f"Total Wave 3 Targets: {total_targets}")
        print(f"Dispatched Targets:   {dispatched_count}")
        print(f"Remaining Targets:    {total_targets - dispatched_count}")
        print(f"Progress:             {(dispatched_count / total_targets) * 100:.1f}%")
        print("=" * 60)
        return

    # Determine slice range
    if args.start is not None and args.end is not None:
        start_idx = max(0, args.start)
        end_idx = min(total_targets, args.end)
        batch_label = f"Custom Slice [{start_idx}:{end_idx}]"
    else:
        batch_size = max(1, args.size)
        start_idx = (args.batch - 1) * batch_size
        end_idx = min(total_targets, start_idx + batch_size)
        batch_label = f"Batch #{args.batch} (Targets {start_idx+1}-{end_idx} of {total_targets})"

    if start_idx >= total_targets:
        print(f"Batch start index {start_idx} exceeds total targets ({total_targets}). Exiting.")
        return

    batch_targets = targets[start_idx:end_idx]

    print("=" * 70)
    print(f"TOOLSVAULT THURSDAY SCALE DISPATCHER - {batch_label}")
    print(f"Sender Persona: John Granbridge ({args.authuser})")
    print(f"Mode: {'OPEN BROWSER TABS' if args.open else 'DRY RUN (Preview Only)'}")
    print("=" * 70)

    dispatched_in_run = 0

    for i, t in enumerate(batch_targets):
        idx = start_idx + i
        company = t.get("name", "Unknown")
        contact = t.get("contact", "Commercial Estimating Team")
        trade = t.get("trade", "Commercial Contracting")
        metro = t.get("metro", "US")
        email = t.get("email", "")

        is_already_sent = email in log_data
        status_marker = "[ALREADY DISPATCHED]" if is_already_sent else "[PENDING]"

        subject = get_followup_subject(trade, metro)
        body = get_followup_body(contact, trade, metro)
        gmail_url = build_gmail_url(email, subject, body, authuser=args.authuser)

        print(f"\nTarget #{idx+1:03d} | {status_marker} {company}")
        print(f"  Trade/Metro : {trade} | {metro}")
        print(f"  Contact/To  : {contact} <{email}>")
        print(f"  Subject     : {subject}")
        print(f"  Gmail URL   : {gmail_url[:100]}...")

        if args.open:
            print(f"  -> Opening Business Gmail Compose Tab...")
            webbrowser.open_new_tab(gmail_url)
            log_data[email] = {
                "company": company,
                "dispatched_at": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
                "batch": args.batch,
                "target_index": idx
            }
            save_dispatch_log(log_data)
            dispatched_in_run += 1
            time.sleep(args.delay)

    print("\n" + "=" * 70)
    if args.open:
        print(f"Successfully launched {dispatched_in_run} compose tabs in Business Gmail.")
        print(f"Dispatch status updated in: {LOG_PATH}")
    else:
        print(f"Dry run complete for {len(batch_targets)} targets.")
        print(f"To open browser tabs, re-run with: --open (e.g. python dispatch_thursday_batch.py --batch {args.batch} --open)")
    print("=" * 70)

if __name__ == "__main__":
    main()
