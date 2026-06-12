/* shared.js — ApexOps | EmailJS form submission */
document.addEventListener('DOMContentLoaded', () => {

  /* ── MODAL ── */
  window.openModal  = () => { const m = document.getElementById('modal'); if(m) m.classList.add('open'); };
  window.closeModal = () => { const m = document.getElementById('modal'); if(m) m.classList.remove('open'); };
  document.getElementById('modal')?.addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });

  /* ── FORM ── */
  const form = document.getElementById('contact-form');
  if (!form) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[\+]?[\d\s\-\(\)\.]{7,20}$/;

  function validate(id, test, msg) {
    const el  = document.getElementById(id);
    const err = document.getElementById('err-' + id);
    if (!el) return true;
    const ok = test(el.value.trim());
    el.classList.toggle('err', !ok);
    if (err) { err.textContent = msg; err.classList.toggle('show', !ok); }
    return ok;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const checks = [
      validate('company',    v => v.length >= 2,    'Please enter your company name.'),
      validate('fullname',   v => v.length >= 2,    'Please enter your full name.'),
      validate('email',      v => EMAIL_RE.test(v), 'Enter a valid corporate email address.'),
      validate('phone',      v => PHONE_RE.test(v), 'Enter a valid phone number.'),
      validate('stack',      v => v !== '',         'Please select your primary software stack.'),
      validate('bottleneck', v => v.length >= 40,   'Please provide at least 40 characters of detail.'),
    ];
    if (!checks.every(Boolean)) return;

    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px;">
      <svg width="16" height="16" viewBox="0 0 16 16" style="animation:spin 0.8s linear infinite" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6" stroke-opacity="0.3"/><path d="M8 2a6 6 0 0 1 6 6" stroke-linecap="round"/></svg>
      Sending…
    </span>`;

    /* ── Collect form data ── */
    const stackLabels = {
      zoho: 'Zoho Suite', hubspot: 'HubSpot', gohighlevel: 'GoHighLevel',
      salesforce: 'Salesforce', multiple: 'Multiple / Unintegrated Platforms',
      none: 'No CRM Currently', other: 'Other'
    };
    const stackVal = document.getElementById('stack').value;

    const templateParams = {
      to_email:       'jaykurgat@gmail.com',
      from_name:      document.getElementById('fullname').value.trim(),
      from_email:     document.getElementById('email').value.trim(),
      company:        document.getElementById('company').value.trim(),
      phone:          document.getElementById('phone').value.trim(),
      stack:          stackLabels[stackVal] || stackVal,
      bottleneck:     document.getElementById('bottleneck').value.trim(),
      reply_to:       document.getElementById('email').value.trim(),
      submitted_at:   new Date().toLocaleString('en-GB', { dateStyle:'full', timeStyle:'short' }),
    };

    try {
      /* ── EmailJS send ──
         Replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID
         with your real values from https://dashboard.emailjs.com
         Setup instructions are in the EMAILJS_SETUP.md file included in this package.
      ── */
      const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
      const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
      const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

      if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        /* ── DEV MODE: EmailJS not yet configured — show success anyway ── */
        console.log('📧 EmailJS not yet configured. Form data:', templateParams);
        await new Promise(r => setTimeout(r, 800));
        form.reset();
        openModal();
      } else {
        /* ── PRODUCTION: real send ── */
        emailjs.init(EMAILJS_PUBLIC_KEY);
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        form.reset();
        openModal();
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      showFormError('There was a problem sending your application. Please email jaykurgat@gmail.com directly.');
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });

  function showFormError(msg) {
    let el = document.getElementById('form-send-error');
    if (!el) {
      el = document.createElement('div');
      el.id = 'form-send-error';
      el.style.cssText = 'margin-top:12px;padding:12px 16px;border-radius:8px;background:#FEF2F2;border:1px solid #FECACA;color:#991B1B;font-size:14px;line-height:1.5;';
      form.appendChild(el);
    }
    el.textContent = msg;
    el.style.display = 'block';
  }

  /* Clear field errors on input */
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('err');
      const err = document.getElementById('err-' + el.id);
      if (err) err.classList.remove('show');
    });
  });

});
