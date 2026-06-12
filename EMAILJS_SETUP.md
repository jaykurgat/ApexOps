# EmailJS Setup Guide — ApexOps Contact Form
## Takes about 10 minutes. Free tier = 200 emails/month.

---

## Step 1 — Create a free EmailJS account
Go to: https://www.emailjs.com
Click **Sign Up Free** → use your Gmail (jaykurgat@gmail.com)

---

## Step 2 — Connect your Gmail as an email service
1. In the EmailJS dashboard, go to **Email Services** → **Add New Service**
2. Choose **Gmail**
3. Click **Connect Account** and authorise with jaykurgat@gmail.com
4. Give it any name (e.g. "ApexOps Gmail")
5. **Copy the Service ID** — it looks like: `service_xxxxxxx`

---

## Step 3 — Create an email template
1. Go to **Email Templates** → **Create New Template**
2. Set **To Email**: `jaykurgat@gmail.com`
3. Set **Subject**:
   ```
   New Diagnostic Application — {{company}} ({{from_name}})
   ```
4. Set **Body** (paste this exactly):
   ```
   New client application received via ApexOps website.

   ─────────────────────────────
   APPLICANT DETAILS
   ─────────────────────────────
   Name:         {{from_name}}
   Company:      {{company}}
   Email:        {{from_email}}
   Phone:        {{phone}}
   Stack:        {{stack}}
   Submitted:    {{submitted_at}}

   ─────────────────────────────
   PRIMARY BOTTLENECK
   ─────────────────────────────
   {{bottleneck}}

   ─────────────────────────────
   Reply directly to: {{reply_to}}
   ```
5. Click **Save**
6. **Copy the Template ID** — it looks like: `template_xxxxxxx`

---

## Step 4 — Get your Public Key
1. Go to **Account** → **General** tab
2. Find **Public Key** — it looks like: `AbCdEfGhIjKlMnOp`
3. Copy it

---

## Step 5 — Paste your credentials into the website
Open `js/shared.js` and find these three lines near the top of the submit handler:

```javascript
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Replace the placeholder strings with your real values, for example:

```javascript
const EMAILJS_PUBLIC_KEY  = 'AbCdEfGhIjKlMnOp';
const EMAILJS_SERVICE_ID  = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
```

Save the file. That's it — the form will now send a fully formatted email
to jaykurgat@gmail.com on every valid submission.

---

## Testing
1. Open `contact.html` in your browser
2. Fill out the form with real data
3. Submit — you should receive an email at jaykurgat@gmail.com within seconds

## Notes
- Free tier: 200 emails/month (upgradeable)
- The form works in DEV MODE (shows success modal) even before you configure
  EmailJS — it just won't send real email until credentials are added
- If you hit the monthly limit, upgrade at https://www.emailjs.com/pricing
