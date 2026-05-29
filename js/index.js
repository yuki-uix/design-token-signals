/* design-token-signals · index page — keyword search */
document.addEventListener('DOMContentLoaded', () => {
  const input    = document.getElementById('theme-search');
  const cards    = document.querySelectorAll('.profile-card');
  const empty    = document.getElementById('search-empty');
  const clearBtn = document.getElementById('search-clear-btn');

  if (!input) return;

  function filter() {
    const query = input.value.trim().toLowerCase();
    const terms = query ? query.split(/\s+/) : [];
    let visible = 0;

    cards.forEach(card => {
      if (!terms.length) {
        card.hidden = false;
        visible++;
        return;
      }
      const kw   = (card.dataset.keywords || '').toLowerCase();
      const name = (card.querySelector('.profile-name')?.textContent || '').toLowerCase();
      const hit  = terms.some(t => kw.includes(t) || name.includes(t));
      card.hidden = !hit;
      if (hit) visible++;
    });

    if (empty) empty.hidden = visible > 0 || !terms.length;
  }

  input.addEventListener('input', filter);

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    filter();
    input.focus();
  });
});
