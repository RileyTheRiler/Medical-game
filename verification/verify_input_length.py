
import re
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Start
        print("Navigating to home...")
        page.goto("http://localhost:5173")

        # 2. Click Start
        print("Clicking Start...")
        start_btn = page.get_by_role("button", name=re.compile(r"(Begin|Resume) Training"))
        start_btn.click()

        # 3. Click Study Tools tab
        print("Clicking Study Tools...")
        tools_tab = page.get_by_role("tab", name="Study Tools")
        tools_tab.click()

        # 4. Click Word Builder
        print("Clicking Word Builder...")
        wb_btn = page.get_by_role("button", name="Word Builder")
        # There might be multiple "Word Builder" texts, but the button should be findable.
        # The button has a heading "Word Builder" inside.
        # Let's try to be specific if needed, but get_by_role("button", name="Word Builder") matches text inside.
        wb_btn.click()

        # 5. Click Fill in Blanks
        print("Clicking Fill in Blanks...")
        fill_btn = page.get_by_role("button", name="Fill in Blanks")
        fill_btn.click()

        # 6. Check input
        print("Checking input...")
        input_el = page.locator("input").first
        expect(input_el).to_be_visible()

        # Verify maxLength attribute
        expect(input_el).to_have_attribute("maxlength", "50")
        print("Attribute maxLength=50 verified.")

        # Verify behavior
        long_text = "a" * 60
        input_el.fill(long_text)

        # In React, if we programmatically set value, it might bypass maxLength if using .fill() which mimics user typing?
        # Actually .fill() in playwright usually respects input constraints or it just sets the value?
        # Let's check the value property.
        # Standard input behavior: user typing is blocked. .fill() is usually smart.
        # But if .fill() sets value directly, it might work.
        # Let's try .type() if we want to simulate typing, but .fill() is preferred.
        # Wait, HTML maxLength attribute prevents the USER from typing more.
        # Playwright's fill might bypass it?
        # Actually, let's just assert the attribute is there. That's the security control.
        # But let's check the value just in case.

        val = input_el.input_value()
        print(f"Input value length: {len(val)}")

        # Take screenshot
        page.screenshot(path="verification/verification.png")
        print("Screenshot saved.")

        browser.close()

if __name__ == "__main__":
    run()
