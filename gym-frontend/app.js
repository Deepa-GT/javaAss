const API = 'http://localhost:8080';
function authHeader() {
  const u = sessionStorage.getItem('u');
  const p = sessionStorage.getItem('p');
  if (!u || !p) return {};
  return { Authorization: 'Basic ' + btoa(u + ':' + p) };
}
async function http(path, opts = {}) {
  const h = Object.assign({'Content-Type': 'application/json'}, authHeader(), opts.headers || {});
  const r = await fetch(API + path, Object.assign({}, opts, { headers: h }));
  const txt = await r.text();
  let data = null;
  try { data = txt ? JSON.parse(txt) : null; } catch { data = txt; }
  if (!r.ok) throw { status: r.status, data };
  return data;
}
async function loadPlans() {
  const list = document.getElementById('plans-list');
  list.innerHTML = 'Loading...';
  try {
    const plans = await http('/api/plans');
    list.innerHTML = '';
    plans.forEach(p => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${p.name}</h3><p>${p.duration}</p><p>₹${p.price}</p><p>${p.features||''}</p>`;
      list.appendChild(div);
    });
  } catch (e) {
    list.textContent = 'Failed to load plans';
  }
}
async function loadSchedules() {
  const level = document.getElementById('level-filter').value;
  const list = document.getElementById('schedule-list');
  list.innerHTML = 'Loading...';
  const q = level ? '?level=' + level : '';
  try {
    const items = await http('/api/schedules' + q);
    list.innerHTML = '';
    items.forEach(s => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${s.title}</h3><p>${s.level}</p><p>${s.description||''}</p>`;
      list.appendChild(div);
    });
  } catch {
    list.textContent = 'Failed to load schedules';
  }
}
document.getElementById('register-form').addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = {};
  fd.forEach((v,k)=>body[k]=v);
  const res = document.getElementById('register-result');
  res.textContent = 'Submitting...';
  try {
    await http('/api/auth/register', { method: 'POST', body: JSON.stringify(body) });
    res.textContent = 'Registered. You can login now.';
    e.target.reset();
  } catch (err) {
    res.textContent = 'Registration failed';
  }
});
document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const u = document.getElementById('login-username').value;
  const p = document.getElementById('login-password').value;
  sessionStorage.setItem('u', u);
  sessionStorage.setItem('p', p);
  const s = document.getElementById('login-status');
  s.textContent = 'Checking...';
  try {
    const me = await http('/api/auth/me');
    s.textContent = `Hello ${me.username}`;
  } catch {
    s.textContent = 'Login failed';
    sessionStorage.clear();
  }
});
document.getElementById('refresh-profile').addEventListener('click', async () => {
  const p = document.getElementById('profile-data');
  const m = document.getElementById('membership-data');
  p.textContent = 'Loading...';
  try {
    const me = await http('/api/auth/me');
    p.textContent = JSON.stringify(me, null, 2);
    const sub = await http('/api/me/subscription');
    m.textContent = JSON.stringify(sub, null, 2);
  } catch {
    p.textContent = 'Not authenticated';
    m.textContent = '';
  }
});
document.getElementById('create-plan-form').addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const body = {};
  fd.forEach((v,k)=>body[k]=k==='price'?Number(v):v);
  try {
    await http('/api/plans', { method: 'POST', body: JSON.stringify(body) });
    e.target.reset();
    await loadPlans();
    alert('Plan created');
  } catch {
    alert('Failed to create plan. Use admin login.');
  }
});
document.getElementById('level-filter').addEventListener('change', loadSchedules);
loadPlans();
loadSchedules();
