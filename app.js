const SUPABASE_URL='https://quejehvdjhlktebfwran.supabase.co';
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZWplaHZkamhsa3RlYmZ3cmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3OTg5ODEsImV4cCI6MjA5NzM3NDk4MX0.i-SrPqwZ5aA5gM5bQa1M-1J0QLgZzyb3Mpo35mZEgJE';
const CLOUDINARY_CLOUD='dbnzswigy';
const CLOUDINARY_PRESET='mardakan';
const sb=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
let currentUser=null,currentRole='warehouse';

// SVG Icons
const ICONS={
  dashboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  products:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 6V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2"/><path d="M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  receipt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><path d="M9 15h14"/></svg>',
  shipment:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m4 0h-4v10h4"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="m14 11 3 3 3-3"/></svg>',
  placement:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20M2 15h20M8 3v18M16 3v18"/></svg>',
  tasks:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  writeoff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
  cells:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M2 13h20M7 3v18M12 3v18M17 3v18"/></svg>',
  categories:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  analytics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  requests:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  rollback:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
  invoices:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  move:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
  picking:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
};

function navIcon(id,color){return '<div class="nav-icon" style="background:'+color+'">'+ICONS[id]+'</div>';}

function toast(msg,type='success'){const t=document.getElementById('toast');t.textContent=msg;t.className='toast '+type+' show';setTimeout(()=>t.className='toast hidden',3200);}
function fmtDate(d){return d?new Date(d).toLocaleDateString('ru-RU'):'—';}
function fmtDT(d){return d?new Date(d).toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}):'—';}
function genReqNum(){return 'REQ-'+Date.now().toString(36).toUpperCase();}
function genArticle(cat){return (cat||'IT').substring(0,2).toUpperCase()+'-'+Math.random().toString(36).substring(2,7).toUpperCase();}

function openModal(html){const o=document.getElementById('modal-overlay');const c=document.getElementById('modal-content');c.innerHTML=html;o.classList.add('show');}
function closeModal(){document.getElementById('modal-overlay').classList.remove('show');}

async function getCats(){const{data}=await sb.from('categories').select('*').order('name');return data||[];}
async function getCells(){const{data}=await sb.from('cells').select('*').order('zone').order('row').order('cell');return data||[];}

async function doLogin(){const email=document.getElementById('login-email').value.trim();const pass=document.getElementById('login-pass').value;if(!email||!pass){toast('Заполните все поля','error');return;}const{data,error}=await sb.auth.signInWithPassword({email,password:pass});if(error){toast(error.message,'error');return;}await initUser(data.user);}
async function logout(){await sb.auth.signOut();document.getElementById('auth-screen').style.display='flex';document.getElementById('app').style.display='none';currentUser=null;}

async function initUser(user){currentUser=user;currentRole=user.user_metadata?.role||'warehouse';updateRoleUI();document.getElementById('auth-screen').style.display='none';document.getElementById('app').style.display='block';await buildSidebar();navigateTo(currentRole==='marketing'?'new_receipt_req':'tasks');}

function updateRoleUI(){const rL={admin:'Администратор',warehouse:'Склад',marketing:'Маркетинг'};document.getElementById('header-username').textContent=currentUser.user_metadata?.name||currentUser.email;const roleEl=document.getElementById('header-role');roleEl.textContent=(rL[currentRole]||currentRole)+(currentUser.user_metadata?.role==='admin'?' ▾':'');}

function openRoleSwitcher(){if(currentUser.user_metadata?.role!=='admin'){toast('Только администратор','error');return;}openModal('<div class="modal-title">👤 Сменить роль</div><div style="display:flex;flex-direction:column;gap:8px"><button class="btn btn-primary" onclick="switchRole(\'admin\')">👑 Администратор</button><button class="btn btn-secondary" onclick="switchRole(\'warehouse\')">🏭 Склад</button><button class="btn btn-secondary" onclick="switchRole(\'marketing\')">📣 Маркетинг</button></div><div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}
async function switchRole(role){currentRole=role;updateRoleUI();await buildSidebar();closeModal();navigateTo(role==='marketing'?'new_receipt_req':role==='warehouse'?'tasks':'dashboard');toast('Роль: '+(role==='admin'?'Администратор':role==='warehouse'?'Склад':'Маркетинг'));}

function navigateTo(page){document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));const el=document.getElementById('nav-'+page);if(el)el.classList.add('active');renderPage(page);}

async function renderPage(page){const c=document.getElementById('page-content');c.innerHTML='<div style="color:var(--mid);padding:20px">Загрузка...</div>';const pages={dashboard:renderDashboard,tasks:renderTasks,products:renderProducts,receipt:renderReceipt,placement:renderPlacement,picking:renderPicking,shipment:renderShipment,move:renderMove,writeoff:renderWriteoff,cells:renderCells,categories:renderCategories,invoices:renderInvoices,analytics:renderAnalytics,rollback:renderRollback,users:renderUsers,requests:renderRequests,new_receipt_req:renderNewReceiptReq,new_shipment_req:renderNewShipmentReq,new_writeoff_req:renderNewWriteoffReq};if(pages[page])await pages[page](c);else c.innerHTML='<div class="card">В разработке</div>';}

async function buildSidebar(){
const{data:newTasks}=await sb.from('tasks').select('type,status').eq('status','Новая');
const counts={receipt:0,shipment:0,writeoff:0,tasks:0};
(newTasks||[]).forEach(t=>{if(t.type==='receipt')counts.receipt++;if(t.type==='shipment')counts.shipment++;if(t.type==='writeoff')counts.writeoff++;counts.tasks++;});
const menus={
  admin:[
    {sec:'Обзор'},
    {id:'dashboard',label:'Дашборд',color:'linear-gradient(135deg,#3B82F6,#6366F1)'},
    {id:'analytics',label:'Аналитика',color:'linear-gradient(135deg,#06B6D4,#3B82F6)'},
    {sec:'Склад'},
    {id:'products',label:'Содержимое',color:'linear-gradient(135deg,#8B5CF6,#6366F1)'},
    {id:'receipt',label:'Приёмка',color:'linear-gradient(135deg,#10B981,#059669)',badge:counts.receipt},
    {id:'placement',label:'Размещение',color:'linear-gradient(135deg,#F59E0B,#D97706)'},
    {id:'shipment',label:'Отгрузка',color:'linear-gradient(135deg,#3B82F6,#2563EB)',badge:counts.shipment},
    {id:'writeoff',label:'Списание',color:'linear-gradient(135deg,#EF4444,#DC2626)',badge:counts.writeoff},
    {id:'picking',label:'Подбор',color:'linear-gradient(135deg,#EC4899,#DB2777)'},
    {id:'move',label:'Перемещение',color:'linear-gradient(135deg,#14B8A6,#0D9488)'},
    {sec:'Документы'},
    {id:'invoices',label:'Накладные',color:'linear-gradient(135deg,#F59E0B,#D97706)'},
    {id:'rollback',label:'Откат',color:'linear-gradient(135deg,#6B7280,#4B5563)'},
    {sec:'Настройки'},
    {id:'cells',label:'Ячейки',color:'linear-gradient(135deg,#8B5CF6,#7C3AED)'},
    {id:'categories',label:'Категории',color:'linear-gradient(135deg,#EC4899,#BE185D)'},
    {id:'users',label:'Пользователи',color:'linear-gradient(135deg,#3B82F6,#1D4ED8)'},
    {id:'requests',label:'Мои заявки',color:'linear-gradient(135deg,#10B981,#047857)'},
  ],
  warehouse:[
    {sec:'Задачи'},
    {id:'tasks',label:'Мои задачи',color:'linear-gradient(135deg,#3B82F6,#6366F1)',badge:counts.tasks},
    {sec:'Операции'},
    {id:'products',label:'Содержимое',color:'linear-gradient(135deg,#8B5CF6,#6366F1)'},
    {id:'receipt',label:'Приёмка',color:'linear-gradient(135deg,#10B981,#059669)',badge:counts.receipt},
    {id:'placement',label:'Размещение',color:'linear-gradient(135deg,#F59E0B,#D97706)'},
    {id:'shipment',label:'Отгрузка',color:'linear-gradient(135deg,#3B82F6,#2563EB)'},
    {id:'picking',label:'Подбор',color:'linear-gradient(135deg,#EC4899,#DB2777)'},
    {id:'move',label:'Перемещение',color:'linear-gradient(135deg,#14B8A6,#0D9488)'},
    {id:'writeoff',label:'Списание',color:'linear-gradient(135deg,#EF4444,#DC2626)'},
  ],
  marketing:[
    {sec:'Мои заявки'},
    {id:'requests',label:'Все заявки',color:'linear-gradient(135deg,#10B981,#047857)'},
    {sec:'Создать заявку'},
    {id:'new_receipt_req',label:'Заявка на приёмку',color:'linear-gradient(135deg,#10B981,#059669)'},
    {id:'new_shipment_req',label:'Заявка на отгрузку',color:'linear-gradient(135deg,#3B82F6,#2563EB)'},
    {id:'new_writeoff_req',label:'Заявка на списание',color:'linear-gradient(135deg,#EF4444,#DC2626)'},
    {sec:'Склад'},
    {id:'products',label:'Содержимое',color:'linear-gradient(135deg,#8B5CF6,#6366F1)'},
  ]
};
const items=menus[currentRole]||menus.warehouse;
let html='';
items.forEach(function(item){
  if(item.sec){html+='<div class="nav-section">'+item.sec+'</div>';return;}
  const iconKey=item.id==='products'?'products':item.id==='receipt'?'receipt':item.id==='shipment'||item.id==='new_shipment_req'?'shipment':item.id==='placement'?'placement':item.id==='tasks'?'tasks':item.id==='writeoff'||item.id==='new_writeoff_req'?'writeoff':item.id==='cells'?'cells':item.id==='categories'?'categories':item.id==='analytics'?'analytics':item.id==='users'?'users':item.id==='requests'||item.id==='new_receipt_req'?'requests':item.id==='rollback'?'rollback':item.id==='invoices'?'invoices':item.id==='move'?'move':item.id==='picking'?'picking':'dashboard';
  html+='<button class="nav-item" id="nav-'+item.id+'" onclick="navigateTo(\''+item.id+'\')">';
  html+='<div class="nav-icon" style="background:'+item.color+'"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="18" height="18">'+ICONS[iconKey]+'</svg></div>';
  html+='<span class="nav-text">'+item.label+'</span>';
  if(item.badge&&item.badge>0)html+='<span class="nav-badge">'+item.badge+'</span>';
  html+='</button>';
});
document.getElementById('sidebar').innerHTML=html;
}
async function renderDashboard(c){
const[{data:prods},{data:tasks},{data:ops}]=await Promise.all([sb.from('products').select('id,status'),sb.from('tasks').select('id,status,type'),sb.from('operations').select('id,type,created_at').gte('created_at',new Date(Date.now()-30*86400000).toISOString())]);
const total=prods?.length||0,inStock=(prods||[]).filter(p=>p.status==='На складе').length,shipped=(prods||[]).filter(p=>p.status==='Отгружен').length,newTasks=(tasks||[]).filter(t=>t.status==='Новая').length;
c.innerHTML='<div class="page-title">Дашборд</div><div class="stat-grid"><div class="stat-card"><div class="stat-num">'+total+'</div><div class="stat-label">Всего товаров</div></div><div class="stat-card"><div class="stat-num">'+inStock+'</div><div class="stat-label">На складе</div></div><div class="stat-card"><div class="stat-num">'+shipped+'</div><div class="stat-label">Отгружено</div></div><div class="stat-card"><div class="stat-num">'+newTasks+'</div><div class="stat-label">Новых задач</div></div></div>';}

async function renderTasks(c){
const{data:tasks}=await sb.from('tasks').select('*,task_items(*)').order('created_at',{ascending:false});
const myT=currentRole==='admin'?tasks:(tasks||[]).filter(t=>t.assigned_to===currentRole||t.assigned_to==='all');
const tI={receipt:'receipt',shipment:'shipment',writeoff:'writeoff',placement:'placement'};
const tL={receipt:'Приёмка',shipment:'Отгрузка',writeoff:'Списание',placement:'Размещение'};
const sC={'Новая':'badge-amber','В работе':'badge-blue','Выполнена':'badge-green','Отменена':'badge-red'};
const isAdminRole=currentUser.user_metadata?.role==='admin';
const showImport=(currentRole==='admin'||currentRole==='warehouse');
let html='<div class="page-title">Мои задачи'+(showImport?'<button class="btn btn-primary btn-sm" onclick="importExcel()">📥 Загрузить</button>':'')+'</div>';
if(myT&&myT.length){
  myT.forEach(function(t){
    const total=t.task_items?.length||0,done=t.task_items?.filter(function(i){return i.is_collected;}).length||0,pct=total?Math.round((done/total)*100):0;
    html+='<div class="task-card '+(t.status==='Выполнена'?'done':t.status==='Новая'?'new':'')+'" onclick="openTask(\''+t.id+'\')">';
    html+='<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">';
    html+='<div style="display:flex;align-items:center;gap:10px">';
    html+='<div class="nav-icon" style="background:linear-gradient(135deg,#3B82F6,#6366F1);width:36px;height:36px"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="16" height="16">'+ICONS[tI[t.type]||'tasks']+'</svg></div>';
    html+='<div><div style="font-weight:700;font-size:14px">'+(tL[t.type]||t.type)+' — '+(t.request_number||'—')+'</div>';
    html+='<div style="font-size:12px;color:var(--mid)">От: '+(t.created_by_name||'—')+' · '+fmtDT(t.created_at)+'</div></div></div>';
    html+='<div style="display:flex;gap:6px;align-items:center"><span class="badge '+(sC[t.status]||'badge-gray')+'">'+t.status+'</span>';
    if(isAdminRole)html+='<button class="btn btn-sm btn-danger" data-tid="'+t.id+'" onclick="event.stopPropagation();deleteTask(this.dataset.tid,\'tasks\')">🗑️</button>';
    html+='</div></div>';
    if(total)html+='<div class="progress-bar"><div class="progress-fill '+(done===total?'done':'')+'" style="width:'+pct+'%"></div></div><div style="font-size:12px;color:var(--mid)">Позиций: '+done+'/'+total+'</div>';
    if(t.note)html+='<div style="font-size:12px;color:var(--mid);margin-top:6px">📝 '+t.note+'</div>';
    html+='</div>';
  });
}else{html+='<div class="card" style="text-align:center;color:var(--mid);padding:40px">Задач нет ✓</div>';}
c.innerHTML=html;}

async function openTask(id){const{data:task}=await sb.from('tasks').select('*,task_items(*,products(name,article))').eq('id',id).single();if(!task)return;window._currentTaskId=id;const tL={receipt:'Приёмка',shipment:'Отгрузка',writeoff:'Списание',placement:'Размещение'};const sC={'Новая':'badge-amber','В работе':'badge-blue','Выполнена':'badge-green'};const isAdmin=currentUser.user_metadata?.role==='admin';let html='<div class="modal-title">'+(tL[task.type]||task.type)+' — '+task.request_number+'</div>';html+='<div style="display:flex;gap:12px;margin-bottom:14px;font-size:13px;flex-wrap:wrap"><div>Статус: <span class="badge '+(sC[task.status]||'badge-gray')+'">'+task.status+'</span></div><div>От: <strong>'+(task.created_by_name||'—')+'</strong></div><div>'+fmtDT(task.created_at)+'</div></div>';if(task.note)html+='<div class="info-box">📝 '+task.note+'</div>';html+='<div class="modal-footer">';if(isAdmin)html+='<button class="btn btn-danger" onclick="deleteTask(window._currentTaskId,\'tasks\');closeModal()">🗑️ Удалить</button>';html+='<button class="btn btn-secondary" onclick="closeModal()">Закрыть</button></div>';openModal(html);}

async function deleteTask(id,returnPage){if(!confirm('Удалить эту заявку?'))return;await sb.from('task_items').delete().eq('task_id',id);await sb.from('tasks').delete().eq('id',id);toast('Заявка удалена');await buildSidebar();renderPage(returnPage||'receipt');}
async function renderProducts(c){
const{data:products}=await sb.from('products').select('*,categories(name),cells(label),product_photos(url)').neq('status','Ожидает приёмки').order('created_at',{ascending:false});
const canEdit=currentRole!=='marketing';
const isAdmin=currentUser.user_metadata?.role==='admin';
let html='<div class="page-title">Содержимое<div style="display:flex;gap:8px">';
if(canEdit)html+='<button class="btn btn-primary btn-sm" onclick="openAddProduct()">+ Добавить</button>';
html+='<button class="btn btn-secondary btn-sm" onclick="exportExcel()">⬇️ Excel</button>';
if(isAdmin)html+='<button class="btn btn-danger btn-sm" onclick="clearAllProducts()">🗑️ Очистить всё</button>';
html+='</div></div>';
html+='<div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">';
html+='<input class="input" id="prod-search" placeholder="Поиск..." style="max-width:240px" oninput="filterProducts()"/>';
html+='<select class="select" id="prod-cat" style="max-width:180px" onchange="filterProducts()"><option value="">Все категории</option></select>';
html+='<select class="select" id="prod-status" style="max-width:160px" onchange="filterProducts()"><option value="">Все статусы</option><option>На складе</option><option>Отгружен</option><option>На списание</option></select>';
html+='</div>';
html+='<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Фото</th><th>Артикул</th><th>Наименование</th><th>Категория</th><th>Ячейка</th><th>Размещён</th><th>Дней</th><th>Статус</th><th></th></tr></thead><tbody id="prod-tbody">';
(products||[]).forEach(function(p){
  const days=p.created_at?Math.floor((new Date()-new Date(p.created_at))/86400000):0;
  const daysColor=days>30?'var(--red)':'var(--green)';
  html+='<tr data-name="'+(p.name||'').toLowerCase()+'" data-cat="'+(p.categories?.name||'')+'" data-status="'+(p.status||'')+'">';
  html+='<td>'+(p.product_photos?.[0]?'<img src="'+p.product_photos[0].url+'" style="width:36px;height:36px;object-fit:cover;border-radius:8px"/>':'<div style="width:36px;height:36px;background:var(--bg3);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px">📦</div>')+'</td>';
  html+='<td style="font-family:monospace;font-size:12px;color:var(--mid)">'+p.article+'</td>';
  html+='<td style="font-weight:600">'+p.name+'</td>';
  html+='<td>'+(p.categories?.name?'<span class="badge badge-blue">'+p.categories.name+'</span>':'—')+'</td>';
  html+='<td>'+(p.cells?.label?'<span class="badge badge-amber">'+p.cells.label+'</span>':'<span style="color:var(--mid)">—</span>')+'</td>';
  html+='<td style="font-size:12px;color:var(--mid)">'+fmtDate(p.created_at)+'</td>';
  html+='<td style="font-weight:700;color:'+daysColor+'">'+days+' д.</td>';
  html+='<td><span class="badge '+(p.status==='На складе'?'badge-green':p.status==='На списание'?'badge-red':'badge-gray')+'">'+p.status+'</span></td>';
  html+='<td>'+(canEdit?'<button class="btn btn-sm btn-secondary" onclick="openProductDetail(\''+p.id+'\')">Открыть</button>':'')+'</td></tr>';
});
html+='</tbody></table></div></div>';
c.innerHTML=html;
const cats=await getCats();const sel=document.getElementById('prod-cat');if(sel)cats.forEach(function(cat){const o=document.createElement('option');o.value=cat.name;o.textContent=cat.name;sel.appendChild(o);});
}

function filterProducts(){const s=(document.getElementById('prod-search')?.value||'').toLowerCase();const cat=document.getElementById('prod-cat')?.value||'';const status=document.getElementById('prod-status')?.value||'';document.querySelectorAll('#prod-tbody tr').forEach(function(tr){const name=tr.dataset.name||'';const trCat=tr.dataset.cat||'';const trStatus=tr.dataset.status||'';const show=(!s||name.includes(s))&&(!cat||trCat===cat)&&(!status||trStatus===status);tr.style.display=show?'':'none';});}

async function clearAllProducts(){if(!confirm('⚠️ Удалить ВСЁ содержимое склада?'))return;if(!confirm('Вы уверены? Все товары будут удалены.'))return;toast('Очищаю...');await sb.from('product_photos').delete().neq('id','00000000-0000-0000-0000-000000000000');await sb.from('cargo_places').delete().neq('id','00000000-0000-0000-0000-000000000000');await sb.from('task_items').delete().neq('id','00000000-0000-0000-0000-000000000000');await sb.from('products').delete().neq('id','00000000-0000-0000-0000-000000000000');toast('Содержимое очищено!');renderPage('products');}

async function openAddProduct(){const cats=await getCats();openModal('<div class="modal-title">+ Добавить товар</div><div class="form-row"><label class="label">Наименование *</label><input class="input" id="pn" placeholder="Диван Milano"/></div><div class="form-grid"><div class="form-row"><label class="label">Артикул</label><input class="input" id="pa" placeholder="IT-001"/></div><div class="form-row"><label class="label">Категория</label><select class="select" id="pc"><option value="">—</option>'+cats.map(function(c){return'<option value="'+c.id+'">'+c.name+'</option>';}).join('')+'</select></div></div><div class="form-grid"><div class="form-row"><label class="label">Кол-во</label><input class="input" id="pq" type="number" value="1" min="1"/></div><div class="form-row"><label class="label">Состояние</label><select class="select" id="ps"><option>Новый</option><option>Б/у</option><option>Повреждён</option></select></div></div><div class="form-row"><label class="label">Описание</label><input class="input" id="pd"/></div><div class="form-row"><label class="label">Фото</label><input type="file" id="pf" accept="image/*" class="input" style="padding:7px"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="saveProduct()">Добавить</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}

async function saveProduct(){const name=document.getElementById('pn').value.trim();if(!name){toast('Введите название','error');return;}const catId=document.getElementById('pc').value;const article=document.getElementById('pa').value.trim()||genArticle(catId);const{data:prod}=await sb.from('products').insert({name,article,category_id:catId||null,quantity:parseInt(document.getElementById('pq').value)||1,condition:document.getElementById('ps').value,description:document.getElementById('pd').value,status:'На складе'}).select().single();const file=document.getElementById('pf').files[0];if(file&&prod){const fd=new FormData();fd.append('file',file);fd.append('upload_preset',CLOUDINARY_PRESET);const res=await fetch('https://api.cloudinary.com/v1_1/'+CLOUDINARY_CLOUD+'/image/upload',{method:'POST',body:fd});const json=await res.json();if(json.secure_url)await sb.from('product_photos').insert({product_id:prod.id,url:json.secure_url});}toast('Товар добавлен!');closeModal();renderPage('products');}

async function openProductDetail(id){const{data:p}=await sb.from('products').select('*,categories(name),cells(label),product_photos(url)').eq('id',id).single();if(!p)return;const isAdmin=currentUser.user_metadata?.role==='admin';let html='<div class="modal-title">'+p.name+'</div>';if(p.product_photos?.length)html+='<img src="'+p.product_photos[0].url+'" style="width:100%;height:200px;object-fit:cover;border-radius:10px;margin-bottom:16px"/>';html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;font-size:13px">';html+='<div><span style="color:var(--mid)">Артикул:</span> <strong>'+p.article+'</strong></div>';html+='<div><span style="color:var(--mid)">Статус:</span> <span class="badge '+(p.status==='На складе'?'badge-green':'badge-gray')+'">'+p.status+'</span></div>';html+='<div><span style="color:var(--mid)">Категория:</span> '+(p.categories?.name||'—')+'</div>';html+='<div><span style="color:var(--mid)">Ячейка:</span> '+(p.cells?.label?'<span class="badge badge-amber">'+p.cells.label+'</span>':'—')+'</div>';html+='<div><span style="color:var(--mid)">Кол-во:</span> '+p.quantity+'</div>';html+='<div><span style="color:var(--mid)">Добавлен:</span> '+fmtDate(p.created_at)+'</div></div>';if(p.description)html+='<div class="info-box">'+p.description+'</div>';html+='<div class="modal-footer">';if(isAdmin)html+='<button class="btn btn-danger" onclick="deleteProduct(\''+p.id+'\');closeModal()">🗑️ Удалить</button>';html+='<button class="btn btn-secondary" onclick="closeModal()">Закрыть</button></div>';openModal(html);}

async function deleteProduct(id){if(!confirm('Удалить товар?'))return;await sb.from('products').delete().eq('id',id);toast('Удалён');renderPage('products');}

async function exportExcel(){const{data:products}=await sb.from('products').select('*,categories(name),cells(label)').order('created_at',{ascending:false});const rows=(products||[]).map(function(p){return{Наименование:p.name,Артикул:p.article,Категория:p.categories?.name||'',Количество:p.quantity,Ячейка:p.cells?.label||'',Статус:p.status,Состояние:p.condition||'',Описание:p.description||'',Добавлен:fmtDate(p.created_at)};});const ws=XLSX.utils.json_to_sheet(rows);const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,'Остатки',ws);XLSX.writeFile(wb,'Gridvo_Остатки_'+new Date().toLocaleDateString('ru-RU').replace(/\./g,'-')+'.xlsx');toast('Excel скачан!');}
async function renderReceipt(c){
const{data:tasks}=await sb.from('tasks').select('*,task_items(*,products(name,article))').eq('type','receipt').order('created_at',{ascending:false});
const sC={'Новая':'badge-amber','В работе':'badge-blue','Выполнена':'badge-green','Отменена':'badge-red'};
const newCount=(tasks||[]).filter(function(t){return t.status==='Новая';}).length;
const isAdmin=currentUser.user_metadata?.role==='admin';
let html='<div class="page-title">Приёмка'+(newCount>0?' <span class="badge badge-red">'+newCount+' новых</span>':'')+'</div>';
if(tasks&&tasks.length){
  tasks.forEach(function(t){
    html+='<div class="task-card '+(t.status==='Выполнена'?'done':t.status==='Новая'?'new':'')+'" onclick="openReceiptTask(\''+t.id+'\')">'; 
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
    html+='<div><div style="font-weight:700;font-size:14px">Приёмка — '+t.request_number+'</div>';
    html+='<div style="font-size:12px;color:var(--mid)">От: '+(t.created_by_name||'—')+' · '+fmtDT(t.created_at)+'</div></div>';
    html+='<div style="display:flex;gap:6px;align-items:center"><span class="badge '+(sC[t.status]||'badge-gray')+'">'+t.status+'</span>';
    if(isAdmin)html+='<button class="btn btn-sm btn-danger" data-tid="'+t.id+'" onclick="event.stopPropagation();deleteTask(this.dataset.tid,\'receipt\')">🗑️</button>';
    html+='</div></div>';
    if(t.task_items&&t.task_items.length)html+='<div style="font-size:12px;color:var(--mid)">Товаров: '+t.task_items.length+'</div>';
    if(t.note)html+='<div style="font-size:12px;color:var(--mid);margin-top:4px">📝 '+t.note+'</div>';
    html+='</div>';
  });
}else{html+='<div class="card" style="text-align:center;color:var(--mid);padding:40px">Заявок на приёмку нет</div>';}
c.innerHTML=html;}

async function openReceiptTask(id){
const{data:task}=await sb.from('tasks').select('*,task_items(*,products(name,article))').eq('id',id).single();
if(!task)return;
window._currentTaskId=task.id;
window._currentTaskItems=task.task_items||[];
const sC={'Новая':'badge-amber','В работе':'badge-blue','Выполнена':'badge-green'};
const isAdmin=currentUser.user_metadata?.role==='admin';
const isDone=task.status==='Выполнена';
const isNew=task.status==='Новая';
const isWork=task.status==='В работе';
const items=window._currentTaskItems;
const pending=items.filter(function(i){return!i.is_collected;});
const done=items.filter(function(i){return i.is_collected;});
let itemsHtml='';
pending.forEach(function(item){
  const name=(item.products&&item.products.name)?item.products.name:'—';
  const art=(item.products&&item.products.article)?item.products.article:'—';
  itemsHtml+='<div id="item-'+item.id+'" style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:6px">';
  itemsHtml+='<span style="font-size:18px">⬜</span>';
  itemsHtml+='<div style="flex:1"><div style="font-weight:600;font-size:13px">'+name+'</div><div style="font-size:12px;color:var(--mid)">'+art+'</div></div>';
  itemsHtml+='<div style="font-weight:700" id="qty-'+item.id+'">'+item.quantity_collected+'/'+item.quantity_required+' шт</div></div>';
});
done.forEach(function(item){
  const name=(item.products&&item.products.name)?item.products.name:'—';
  itemsHtml+='<div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(16,185,129,.1);border-radius:8px;margin-bottom:6px;opacity:.7">';
  itemsHtml+='<span style="font-size:18px">✅</span>';
  itemsHtml+='<div style="flex:1"><div style="font-weight:600;font-size:13px">'+name+'</div></div>';
  itemsHtml+='<div style="font-weight:700;color:var(--green)">'+item.quantity_collected+'/'+item.quantity_required+' шт</div></div>';
});
let scanner='';
if(isWork){
  scanner='<div class="scanner-box"><div style="font-size:13px;font-weight:600;color:var(--mid);margin-bottom:10px">🔍 Сканирование артикула</div>';
  scanner+='<input class="input" id="scan-inp" placeholder="Сканируйте или введите артикул..."/>';
  scanner+='<button class="btn btn-primary" style="margin-top:10px;width:100%" onclick="doScanReceipt()">Подтвердить</button>';
  scanner+='<div id="scan-result"></div></div>';
}
let footer='';
if(isNew)footer+='<button class="btn btn-primary" onclick="acceptReceiptTask(window._currentTaskId)">▶ Начать приёмку</button>';
if(isWork)footer+='<button class="btn btn-success" onclick="checkAndCompleteReceipt(window._currentTaskId)">✓ Завершить</button>';
if(isAdmin)footer+='<button class="btn btn-danger" onclick="deleteTask(window._currentTaskId,\'receipt\');closeModal()">🗑️ Удалить</button>';
footer+='<button class="btn btn-secondary" onclick="closeModal()">Закрыть</button>';
let html='<div class="modal-title">📥 Приёмка — '+task.request_number+'</div>';
html+='<div style="display:flex;gap:12px;margin-bottom:14px;font-size:13px;flex-wrap:wrap">';
html+='<div>Статус: <span class="badge '+(sC[task.status]||'badge-gray')+'">'+task.status+'</span></div>';
html+='<div>От: <strong>'+(task.created_by_name||'—')+'</strong></div>';
html+='<div>'+fmtDT(task.created_at)+'</div></div>';
if(task.note)html+='<div class="info-box">📝 '+task.note+'</div>';
html+='<div style="margin-bottom:14px">'+itemsHtml+'</div>'+scanner;
html+='<div class="modal-footer">'+footer+'</div>';
openModal(html);
setTimeout(function(){const el=document.getElementById('scan-inp');if(el){el.focus();el.addEventListener('keydown',function(e){if(e.key==='Enter')doScanReceipt();});}},150);}

async function acceptReceiptTask(id){await sb.from('tasks').update({status:'В работе',started_at:new Date().toISOString(),executed_by_name:currentUser.user_metadata?.name}).eq('id',id);toast('Приёмка начата!');closeModal();await buildSidebar();openReceiptTask(id);}

async function doScanReceipt(){
const inp=document.getElementById('scan-inp');
const article=(inp?inp.value:'').trim();
if(!article)return;
const res=document.getElementById('scan-result');
const items=window._currentTaskItems||[];
const item=items.find(function(i){return i.products&&i.products.article===article&&!i.is_collected;});
if(!item){
  const already=items.find(function(i){return i.products&&i.products.article===article&&i.is_collected;});
  if(res)res.innerHTML='<div class="scan-err">❌ '+(already?'Уже принят: '+article:'Не найден в заявке: '+article)+'</div>';
  if(inp){inp.value='';inp.focus();}return;
}
const newC=item.quantity_collected+1;
const isDone=newC>=item.quantity_required;
await sb.from('task_items').update({quantity_collected:newC,is_collected:isDone}).eq('id',item.id);
item.quantity_collected=newC;item.is_collected=isDone;
if(res)res.innerHTML='<div class="scan-ok">✅ '+item.products.name+' — '+newC+'/'+item.quantity_required+'</div>';
if(inp){inp.value='';inp.focus();}
const qtyEl=document.getElementById('qty-'+item.id);
const rowEl=document.getElementById('item-'+item.id);
if(isDone&&rowEl){rowEl.style.background='rgba(16,185,129,.1)';rowEl.style.opacity='0.7';rowEl.querySelector('span').textContent='✅';if(qtyEl)qtyEl.style.color='var(--green)';const container=rowEl.parentNode;if(container)container.appendChild(rowEl);}
else if(qtyEl){qtyEl.textContent=newC+'/'+item.quantity_required+' шт';}
const allDone=items.every(function(i){return i.is_collected;});
if(allDone)setTimeout(function(){completeReceiptTask(window._currentTaskId);},800);
await sb.from('tasks').update({status:'В работе',started_at:new Date().toISOString()}).eq('id',window._currentTaskId).eq('status','Новая');}

async function checkAndCompleteReceipt(id){
const items=window._currentTaskItems||[];
const notDone=items.filter(function(i){return!i.is_collected;});
if(notDone.length>0){
  const notDoneQty=notDone.reduce(function(sum,i){return sum+(i.quantity_required-i.quantity_collected);},0);
  openModal('<div style="text-align:center;padding:20px"><div style="font-size:48px;margin-bottom:16px">⚠️</div><div style="font-size:17px;font-weight:700;margin-bottom:10px;color:var(--text)">Не все позиции приняты</div><div style="font-size:14px;color:var(--mid);margin-bottom:24px">Осталось принять: <strong style="color:var(--red)">'+notDoneQty+' шт</strong></div><div class="modal-footer" style="justify-content:center"><button class="btn btn-success" onclick="closeModal();completeReceiptTask(window._currentTaskId)">Всё равно завершить</button><button class="btn btn-secondary" onclick="closeModal();openReceiptTask(window._currentTaskId)">← Вернуться</button></div></div>');
  return;}
await completeReceiptTask(id);}

async function completeReceiptTask(id){
const now=new Date().toISOString();
const{data:task}=await sb.from('tasks').select('*,task_items(product_id)').eq('id',id).single();
const mins=task.started_at?Math.round((new Date(now)-new Date(task.started_at))/60000):null;
const prodIds=(task.task_items||[]).map(function(i){return i.product_id;}).filter(Boolean);
if(prodIds.length)await sb.from('products').update({status:'На складе'}).in('id',prodIds);
await sb.from('tasks').update({status:'Выполнена',completed_at:now,executed_by_name:currentUser.user_metadata?.name}).eq('id',id);
await sb.from('operations').insert({type:'receipt',started_at:task.started_at,completed_at:now,duration_minutes:mins,created_by_name:task.created_by_name,executed_by_name:currentUser.user_metadata?.name,note:task.request_number});
toast('Приёмка завершена! Разместите товары 📍','success');
closeModal();await buildSidebar();renderPage('placement');}
async function renderPlacement(c){const{data:ops}=await sb.from('operations').select('*,products(name,article),ct:to_cell_id(label)').eq('type','placement').order('created_at',{ascending:false});c.innerHTML='<div class="page-title">Размещение <button class="btn btn-primary btn-sm" onclick="openPlacementForm()">+ Разместить</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Дата</th><th>Товар</th><th>Ячейка</th><th>Разместил</th></tr></thead><tbody>'+(ops||[]).map(function(o){return'<tr><td>'+fmtDT(o.created_at)+'</td><td style="font-weight:600">'+(o.products?.name||'—')+'</td><td>'+(o.ct?.label?'<span class="badge badge-amber">'+o.ct.label+'</span>':'—')+'</td><td>'+(o.executed_by_name||'—')+'</td></tr>';}).join('')+'</tbody></table></div></div>';}

async function openPlacementForm(){const{data:prods}=await sb.from('products').select('id,name,article').is('cell_id',null).eq('status','На складе');const cells=await getCells();openModal('<div class="modal-title">📍 Разместить товар</div><div class="form-row"><label class="label">Товар *</label><select class="select" id="plp"><option value="">— выбрать —</option>'+(prods||[]).map(function(p){return'<option value="'+p.id+'">'+p.name+' ('+p.article+')</option>';}).join('')+'</select></div><div class="form-row"><label class="label">Ячейка *</label><select class="select" id="plc"><option value="">— выбрать —</option>'+cells.filter(function(c){return!c.is_occupied;}).map(function(c){return'<option value="'+c.id+'">'+c.label+'</option>';}).join('')+'</select></div><div class="form-row"><label class="label">Примечание</label><input class="input" id="pln"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="savePlacement()">Разместить</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}

async function savePlacement(){const prodId=document.getElementById('plp').value;const cellId=document.getElementById('plc').value;if(!prodId||!cellId){toast('Выберите товар и ячейку','error');return;}const now=new Date().toISOString();await sb.from('products').update({cell_id:cellId}).eq('id',prodId);await sb.from('cells').update({is_occupied:true}).eq('id',cellId);await sb.from('operations').insert({type:'placement',product_id:prodId,to_cell_id:cellId,note:document.getElementById('pln').value,started_at:now,completed_at:now,executed_by_name:currentUser.user_metadata?.name});toast('Товар размещён!');closeModal();renderPage('placement');}

async function renderPicking(c){c.innerHTML='<div class="page-title">Подбор товара</div><div class="card" style="margin-bottom:16px"><div style="display:flex;gap:10px;flex-wrap:wrap"><input class="input" id="pks" placeholder="Название или артикул..." style="max-width:280px"/><select class="select" id="pkc" style="max-width:200px"><option value="">Все категории</option></select><button class="btn btn-primary" onclick="doPicking()">Найти</button></div></div><div id="pick-res"></div>';const cats=await getCats();const sel=document.getElementById('pkc');if(sel)cats.forEach(function(cat){const o=document.createElement('option');o.value=cat.id;o.textContent=cat.name;sel.appendChild(o);});}
async function doPicking(){const s=document.getElementById('pks').value.trim();const cat=document.getElementById('pkc').value;let q=sb.from('products').select('*,categories(name),cells(label),product_photos(url)').eq('status','На складе');if(s)q=q.or('name.ilike.%'+s+'%,article.ilike.%'+s+'%');if(cat)q=q.eq('category_id',cat);const{data}=await q;const el=document.getElementById('pick-res');if(!data?.length){el.innerHTML='<div class="card" style="color:var(--mid);text-align:center;padding:30px">Не найдено</div>';return;}el.innerHTML='<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Фото</th><th>Артикул</th><th>Наименование</th><th>Ячейка</th><th></th></tr></thead><tbody>'+data.map(function(p){return'<tr><td>'+(p.product_photos?.[0]?'<img src="'+p.product_photos[0].url+'" style="width:36px;height:36px;object-fit:cover;border-radius:8px"/>':'—')+'</td><td style="font-family:monospace;font-size:12px">'+p.article+'</td><td style="font-weight:600">'+p.name+'</td><td>'+(p.cells?.label?'<span class="badge badge-amber">'+p.cells.label+'</span>':'—')+'</td><td><button class="btn btn-sm btn-secondary" onclick="openProductDetail(\''+p.id+'\')">Открыть</button></td></tr>';}).join('')+'</tbody></table></div></div>';}

async function renderShipment(c){const{data:ops}=await sb.from('operations').select('*,products(name,article)').eq('type','shipment').order('created_at',{ascending:false});c.innerHTML='<div class="page-title">Отгрузка <button class="btn btn-primary btn-sm" onclick="openShipmentForm()">+ Отгрузить</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Дата</th><th>Товар</th><th>Кол-во</th><th>Кому</th><th>Отгрузил</th><th>Накладная</th></tr></thead><tbody>'+(ops||[]).map(function(o){return'<tr><td>'+fmtDT(o.created_at)+'</td><td style="font-weight:600">'+(o.products?.name||'—')+'</td><td>'+(o.quantity||1)+'</td><td>'+(o.note||'—')+'</td><td>'+(o.executed_by_name||'—')+'</td><td style="font-size:12px">'+(o.invoice_number||'—')+'</td></tr>';}).join('')+'</tbody></table></div></div>';}
async function openShipmentForm(){const{data:prods}=await sb.from('products').select('id,name,article').eq('status','На складе');openModal('<div class="modal-title">📤 Отгрузка</div><div class="form-row"><label class="label">Товар *</label><select class="select" id="shp"><option value="">— выбрать —</option>'+(prods||[]).map(function(p){return'<option value="'+p.id+'">'+p.name+' ('+p.article+')</option>';}).join('')+'</select></div><div class="form-row"><label class="label">Количество</label><input class="input" id="shq" type="number" value="1" min="1" style="max-width:110px"/></div><div class="form-row"><label class="label">Кому / куда *</label><input class="input" id="shn" placeholder="Магазин, мероприятие..."/></div><div class="modal-footer"><button class="btn btn-primary" onclick="saveShipment()">Отгрузить</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}
async function saveShipment(){const prodId=document.getElementById('shp').value;if(!prodId){toast('Выберите товар','error');return;}const counterparty=document.getElementById('shn').value;const now=new Date().toISOString();const{data:inv}=await sb.from('invoices').insert({type:'shipment',counterparty,created_by_name:currentUser.user_metadata?.name}).select().single();await sb.from('operations').insert({type:'shipment',product_id:prodId,quantity:parseInt(document.getElementById('shq').value)||1,note:counterparty,invoice_number:'№'+(inv?.number||''),started_at:now,completed_at:now,executed_by_name:currentUser.user_metadata?.name});const{data:p}=await sb.from('products').select('cell_id').eq('id',prodId).single();if(p?.cell_id)await sb.from('cells').update({is_occupied:false}).eq('id',p.cell_id);await sb.from('products').update({status:'Отгружен',cell_id:null}).eq('id',prodId);toast('Отгружено!');closeModal();renderPage('shipment');}

async function renderMove(c){const{data:ops}=await sb.from('operations').select('*,products(name,article),cf:from_cell_id(label),ct:to_cell_id(label)').eq('type','move').order('created_at',{ascending:false});c.innerHTML='<div class="page-title">Перемещение <button class="btn btn-primary btn-sm" onclick="openMoveForm()">+ Переместить</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Дата</th><th>Товар</th><th>Откуда</th><th>Куда</th><th>Кто</th></tr></thead><tbody>'+(ops||[]).map(function(o){return'<tr><td>'+fmtDT(o.created_at)+'</td><td style="font-weight:600">'+(o.products?.name||'—')+'</td><td>'+(o.cf?.label?'<span class="badge badge-amber">'+o.cf.label+'</span>':'—')+'</td><td>'+(o.ct?.label?'<span class="badge badge-green">'+o.ct.label+'</span>':'—')+'</td><td>'+(o.executed_by_name||'—')+'</td></tr>';}).join('')+'</tbody></table></div></div>';}
async function openMoveForm(){const{data:prods}=await sb.from('products').select('id,name,article,cell_id,cells(label)').eq('status','На складе').not('cell_id','is',null);const cells=await getCells();openModal('<div class="modal-title">🔄 Переместить</div><div class="form-row"><label class="label">Товар *</label><select class="select" id="mvp" onchange="setFrom(this)"><option value="">— выбрать —</option>'+(prods||[]).map(function(p){return'<option value="'+p.id+'" data-cell="'+(p.cell_id||'')+'" data-label="'+(p.cells?.label||'')+'">'+p.name+' — '+(p.cells?.label||'—')+'</option>';}).join('')+'</select></div><div class="form-row"><label class="label">Текущая ячейка</label><input class="input" id="mv-from" readonly style="background:var(--bg3)"/></div><div class="form-row"><label class="label">Новая ячейка *</label><select class="select" id="mvt"><option value="">— выбрать —</option>'+cells.map(function(c){return'<option value="'+c.id+'">'+c.label+(c.is_occupied?' (занята)':'')+'</option>';}).join('')+'</select></div><div class="form-row"><label class="label">Причина</label><input class="input" id="mvn"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="saveMove()">Переместить</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}
function setFrom(sel){const opt=sel.options[sel.selectedIndex];document.getElementById('mv-from').value=opt.dataset.label||'';}
async function saveMove(){const prodId=document.getElementById('mvp').value;const toCell=document.getElementById('mvt').value;if(!prodId||!toCell){toast('Заполните поля','error');return;}const sel=document.getElementById('mvp');const fromCell=sel.options[sel.selectedIndex].dataset.cell;const now=new Date().toISOString();if(fromCell)await sb.from('cells').update({is_occupied:false}).eq('id',fromCell);await sb.from('cells').update({is_occupied:true}).eq('id',toCell);await sb.from('products').update({cell_id:toCell}).eq('id',prodId);await sb.from('operations').insert({type:'move',product_id:prodId,from_cell_id:fromCell||null,to_cell_id:toCell,note:document.getElementById('mvn').value,started_at:now,completed_at:now,executed_by_name:currentUser.user_metadata?.name});toast('Перемещено!');closeModal();renderPage('move');}

async function renderWriteoff(c){const{data:acts}=await sb.from('writeoff_acts').select('*').order('created_at',{ascending:false});const isAdmin=currentUser.user_metadata?.role==='admin';c.innerHTML='<div class="page-title">Списание <button class="btn btn-primary btn-sm" onclick="openWriteoffForm()">+ Акт списания</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>№ Акта</th><th>Дата</th><th>Выполнил</th><th>Примечание</th><th></th></tr></thead><tbody>'+(acts||[]).map(function(a){return'<tr><td style="font-weight:700">№'+a.number+'</td><td>'+fmtDT(a.created_at)+'</td><td>'+(a.executed_by_name||'—')+'</td><td style="font-size:12px;color:var(--mid)">'+(a.note||'—')+'</td><td style="display:flex;gap:6px"><button class="btn btn-sm btn-secondary" onclick="printWriteoff('+JSON.stringify(a)+')">🖨️</button>'+(isAdmin?'<button class="btn btn-sm btn-danger" onclick="deleteWriteoff(\''+a.id+'\')">🗑️</button>':'')+'</td></tr>';}).join('')+'</tbody></table></div></div>';}
async function deleteWriteoff(id){if(!confirm('Удалить акт?'))return;await sb.from('writeoff_items').delete().eq('act_id',id);await sb.from('writeoff_acts').delete().eq('id',id);toast('Удалён');renderPage('writeoff');}
async function openWriteoffForm(){const{data:prods}=await sb.from('products').select('id,name,article');const opts=(prods||[]).map(function(p){return'<option value="'+p.id+'">'+p.name+' ('+p.article+')</option>';}).join('');openModal('<div class="modal-title">🗑️ Акт списания</div><div id="wo-rows"><div class="cargo-row" id="wor-1"><div class="cargo-num">1</div><select class="select" id="wop-1"><option value="">— товар —</option>'+opts+'</select><input class="input" id="woq-1" type="number" value="1" min="1" style="width:70px"/><input class="input" id="worn-1" placeholder="Причина" style="flex:1"/></div></div><button class="btn btn-sm btn-secondary" style="margin-bottom:14px" onclick="addWoRow()">+ Строка</button><div class="form-row"><label class="label">Примечание к акту</label><input class="input" id="wo-note"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="saveWriteoff()">Создать акт</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');window._woRows=1;window._woOpts=opts;}
function addWoRow(){window._woRows++;const n=window._woRows;const div=document.createElement('div');div.className='cargo-row';div.id='wor-'+n;div.innerHTML='<div class="cargo-num">'+n+'</div><select class="select" id="wop-'+n+'"><option value="">— товар —</option>'+(window._woOpts||'')+'</select><input class="input" id="woq-'+n+'" type="number" value="1" min="1" style="width:70px"/><input class="input" id="worn-'+n+'" placeholder="Причина" style="flex:1"/><button class="btn btn-sm btn-danger" onclick="document.getElementById(\'wor-'+n+'\').remove()">✕</button>';document.getElementById('wo-rows').appendChild(div);}
async function saveWriteoff(){const now=new Date().toISOString();const{data:act}=await sb.from('writeoff_acts').insert({created_by_name:currentUser.user_metadata?.name,executed_by_name:currentUser.user_metadata?.name,note:document.getElementById('wo-note').value}).select().single();for(let i=1;i<=window._woRows;i++){const row=document.getElementById('wor-'+i);if(!row)continue;const prodId=document.getElementById('wop-'+i)?.value;if(!prodId)continue;const qty=parseInt(document.getElementById('woq-'+i)?.value)||1;const reason=document.getElementById('worn-'+i)?.value||'';await sb.from('writeoff_items').insert({act_id:act.id,product_id:prodId,quantity:qty,reason});await sb.from('products').update({status:'На списание'}).eq('id',prodId);await sb.from('operations').insert({type:'writeoff',product_id:prodId,quantity:qty,note:reason,started_at:now,completed_at:now,executed_by_name:currentUser.user_metadata?.name});}toast('Акт №'+act.number+' создан');closeModal();renderPage('writeoff');}
function printWriteoff(act){const w=window.open('','_blank');w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Акт №'+act.number+'</title><style>body{font-family:Arial;padding:40px}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{border:1px solid #ccc;padding:8px}th{background:#f5f5f5}.footer{margin-top:50px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}.sign{border-top:1px solid #000;padding-top:6px;font-size:12px}</style></head><body><h2>Gridvo — Склад Мардакян</h2><h3>АКТ СПИСАНИЯ №'+act.number+'</h3><p>Дата: <strong>'+fmtDate(act.created_at)+'</strong></p><table><thead><tr><th>№</th><th>Наименование</th><th>Артикул</th><th>Кол-во</th><th>Причина</th></tr></thead><tbody>'+[1,2,3,4,5].map(function(i){return'<tr><td>'+i+'</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';}).join('')+'</tbody></table>'+(act.note?'<p>Примечание: '+act.note+'</p>':'')+'<div class="footer"><div><div class="sign">Сдал: _______________</div></div><div><div class="sign">Принял: _______________</div></div><div><div class="sign">Дата: _______________</div></div></div><script>window.print();window.close();<\/script></body></html>');w.document.close();}
async function renderCells(c){const{data:cells}=await sb.from('cells').select('*').order('zone').order('row').order('cell');c.innerHTML='<div class="page-title">Ячейки <button class="btn btn-primary btn-sm" onclick="openAddCell()">+ Создать</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Ячейка</th><th>Зона</th><th>Ряд</th><th>Место</th><th>Статус</th><th></th></tr></thead><tbody>'+(cells||[]).map(function(cell){return'<tr><td><span class="badge badge-blue" style="font-family:monospace">'+cell.label+'</span></td><td>'+cell.zone+'</td><td>'+cell.row+'</td><td>'+cell.cell+'</td><td><span class="badge '+(cell.is_occupied?'badge-red':'badge-green')+'">'+(cell.is_occupied?'Занята':'Свободна')+'</span></td><td>'+(currentRole==='admin'?'<button class="btn btn-sm btn-danger" onclick="deleteCell(\''+cell.id+'\')">Удалить</button>':'')+'</td></tr>';}).join('')+'</tbody></table></div></div>';}
async function openAddCell(){openModal('<div class="modal-title">🗃️ Новая ячейка</div><div class="info-box">💡 Формат: Зона-Ряд-Место (A-1-01)</div><div class="form-grid"><div class="form-row"><label class="label">Зона *</label><input class="input" id="cz" placeholder="A"/></div><div class="form-row"><label class="label">Ряд *</label><input class="input" id="cr" placeholder="1"/></div></div><div class="form-row"><label class="label">Место(а) *</label><input class="input" id="cc" placeholder="01,02,03"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="saveCell()">Создать</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}
async function saveCell(){const zone=document.getElementById('cz').value.trim();const row=document.getElementById('cr').value.trim();const cells=document.getElementById('cc').value.trim();if(!zone||!row||!cells){toast('Заполните все поля','error');return;}const list=cells.split(',').map(function(s){return s.trim();}).filter(Boolean);for(let i=0;i<list.length;i++)await sb.from('cells').insert({zone,row,cell:list[i]});toast('Создано: '+list.length+' ячеек');closeModal();renderPage('cells');}
async function deleteCell(id){if(!confirm('Удалить ячейку?'))return;await sb.from('cells').delete().eq('id',id);toast('Удалено');renderPage('cells');}

async function renderCategories(c){const{data:cats}=await sb.from('categories').select('*').order('name');c.innerHTML='<div class="page-title">Категории <button class="btn btn-primary btn-sm" onclick="openAddCat()">+ Добавить</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Название</th><th></th></tr></thead><tbody>'+(cats||[]).map(function(cat){return'<tr><td style="font-weight:600">'+cat.name+'</td><td>'+(currentRole==='admin'?'<button class="btn btn-sm btn-danger" onclick="deleteCat(\''+cat.id+'\')">Удалить</button>':'')+'</td></tr>';}).join('')+'</tbody></table></div></div>';}
async function openAddCat(){openModal('<div class="modal-title">Новая категория</div><div class="form-row"><label class="label">Название *</label><input class="input" id="catn" placeholder="Мебель"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="saveCat()">Добавить</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}
async function saveCat(){const name=document.getElementById('catn').value.trim();if(!name){toast('Введите название','error');return;}await sb.from('categories').insert({name});toast('Добавлено!');closeModal();renderPage('categories');}
async function deleteCat(id){if(!confirm('Удалить?'))return;await sb.from('categories').delete().eq('id',id);toast('Удалено');renderPage('categories');}

async function renderInvoices(c){const{data:invs}=await sb.from('invoices').select('*').order('created_at',{ascending:false});c.innerHTML='<div class="page-title">Накладные <button class="btn btn-primary btn-sm" onclick="openCreateInvoice()">+ Создать</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>№</th><th>Тип</th><th>Контрагент</th><th>Создал</th><th>Дата</th><th></th></tr></thead><tbody>'+(invs||[]).map(function(inv){return'<tr><td style="font-weight:700;font-family:monospace">№'+inv.number+'</td><td><span class="badge '+(inv.type==='receipt'?'badge-green':'badge-blue')+'">'+(inv.type==='receipt'?'Приёмка':'Отгрузка')+'</span></td><td>'+(inv.counterparty||'—')+'</td><td>'+(inv.created_by_name||'—')+'</td><td>'+fmtDate(inv.created_at)+'</td><td><button class="btn btn-sm btn-secondary" onclick="printInvoice('+JSON.stringify(inv)+')">🖨️</button></td></tr>';}).join('')+'</tbody></table></div></div>';}
async function openCreateInvoice(){openModal('<div class="modal-title">Новая накладная</div><div class="form-row"><label class="label">Тип</label><select class="select" id="invt"><option value="receipt">Приёмка</option><option value="shipment">Отгрузка</option></select></div><div class="form-row"><label class="label">Контрагент</label><input class="input" id="invcp"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="saveInvoice()">Создать</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}
async function saveInvoice(){const{data}=await sb.from('invoices').insert({type:document.getElementById('invt').value,counterparty:document.getElementById('invcp').value,created_by_name:currentUser.user_metadata?.name}).select().single();toast('Накладная №'+data?.number+' создана!');closeModal();renderPage('invoices');}
function printInvoice(inv){const tL=inv.type==='receipt'?'НАКЛАДНАЯ НА ПРИЁМКУ':'НАКЛАДНАЯ НА ОТГРУЗКУ';const w=window.open('','_blank');w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Накладная №'+inv.number+'</title><style>body{font-family:Arial;padding:40px}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{border:1px solid #ccc;padding:8px}th{background:#f5f5f5}.footer{margin-top:50px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}.sign{border-top:1px solid #000;padding-top:6px;font-size:12px}</style></head><body><h2>Gridvo — Склад Мардакян</h2><h3>'+tL+'</h3><p>№ <strong>'+inv.number+'</strong> | Дата: <strong>'+fmtDate(inv.created_at)+'</strong>'+(inv.counterparty?' | Контрагент: <strong>'+inv.counterparty+'</strong>':'')+'</p><table><thead><tr><th>№</th><th>Наименование</th><th>Артикул</th><th>Кол-во</th><th>Примечание</th></tr></thead><tbody>'+[1,2,3,4,5,6].map(function(i){return'<tr><td>'+i+'</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';}).join('')+'</tbody></table><div class="footer"><div><div class="sign">Сдал: _______________</div></div><div><div class="sign">Принял: _______________</div></div><div><div class="sign">Дата: _______________</div></div></div><script>window.print();window.close();<\/script></body></html>');w.document.close();}

async function renderAnalytics(c){const{data:ops}=await sb.from('operations').select('*').order('created_at',{ascending:false});const tL={receipt:'Приёмка',shipment:'Отгрузка',placement:'Размещение',move:'Перемещение',writeoff:'Списание'};const byType={};(ops||[]).forEach(function(o){if(!byType[o.type])byType[o.type]={count:0,qty:0,mins:[]};byType[o.type].count++;byType[o.type].qty+=(o.quantity||0);if(o.duration_minutes)byType[o.type].mins.push(o.duration_minutes);});c.innerHTML='<div class="page-title">Аналитика</div><div class="stat-grid">'+Object.entries(byType).map(function(e){const type=e[0],s=e[1];return'<div class="stat-card"><div class="stat-num">'+s.count+'</div><div class="stat-label">'+(tL[type]||type)+'</div>'+(s.mins.length?'<div style="font-size:11px;color:var(--mid);margin-top:4px">⏱ '+Math.round(s.mins.reduce(function(a,b){return a+b;},0)/s.mins.length)+' мин/оп</div>':'')+'</div>';}).join('')+'</div><div class="card"><div style="font-size:15px;font-weight:700;margin-bottom:14px">Все операции</div><div class="table-wrap"><table class="table"><thead><tr><th>Тип</th><th>Дата</th><th>Выполнил</th><th>Кол-во</th><th>Время</th></tr></thead><tbody>'+(ops||[]).slice(0,40).map(function(o){return'<tr><td><span class="badge badge-gray">'+(tL[o.type]||o.type)+'</span></td><td>'+fmtDT(o.created_at)+'</td><td>'+(o.executed_by_name||'—')+'</td><td>'+(o.quantity||'—')+'</td><td>'+(o.duration_minutes?o.duration_minutes+' мин':'—')+'</td></tr>';}).join('')+'</tbody></table></div></div>';}

async function renderRollback(c){const{data:ops}=await sb.from('operations').select('*,products(name,article)').order('created_at',{ascending:false}).limit(50);c.innerHTML='<div class="page-title">↩️ Откат операций</div><div class="info-box" style="color:#EF4444;margin-bottom:20px">⚠️ Только для администратора. Использовать осторожно.</div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Дата</th><th>Тип</th><th>Товар</th><th>Кто</th><th></th></tr></thead><tbody>'+(ops||[]).map(function(o){return'<tr><td>'+fmtDT(o.created_at)+'</td><td><span class="badge badge-gray">'+o.type+'</span></td><td style="font-weight:600">'+(o.products?.name||'—')+'</td><td>'+(o.executed_by_name||'—')+'</td><td><button class="btn btn-sm btn-danger" onclick="rollback(\''+o.id+'\',\''+o.type+'\',\''+(o.product_id||'')+'\',\''+(o.to_cell_id||'')+'\',\''+(o.from_cell_id||'')+'\')">↩️</button></td></tr>';}).join('')+'</tbody></table></div></div>';}
async function rollback(opId,type,prodId,toCellId,fromCellId){const reason=prompt('Причина отката:');if(reason===null)return;await sb.from('rollback_history').insert({operation_id:opId,rolled_back_by:currentUser.user_metadata?.name,reason});if(type==='shipment'&&prodId)await sb.from('products').update({status:'На складе'}).eq('id',prodId);if(type==='placement'&&prodId){await sb.from('products').update({cell_id:null}).eq('id',prodId);if(toCellId)await sb.from('cells').update({is_occupied:false}).eq('id',toCellId);}if(type==='move'&&prodId&&fromCellId){await sb.from('products').update({cell_id:fromCellId}).eq('id',prodId);if(toCellId)await sb.from('cells').update({is_occupied:false}).eq('id',toCellId);await sb.from('cells').update({is_occupied:true}).eq('id',fromCellId);}if(type==='writeoff'&&prodId)await sb.from('products').update({status:'На складе'}).eq('id',prodId);await sb.from('operations').delete().eq('id',opId);toast('Операция откатана!');renderPage('rollback');}
async function renderUsers(c){
const{data:users}=await sb.from('user_profiles').select('*').order('created_at',{ascending:false});
const rL={admin:'Администратор',warehouse:'Склад',marketing:'Маркетинг'};
const rB={admin:'badge-amber',warehouse:'badge-blue',marketing:'badge-green'};
let html='<div class="page-title">Пользователи <button class="btn btn-primary btn-sm" onclick="openAddUser()">+ Создать аккаунт</button></div>';
if(users&&users.length){
  html+='<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Имя</th><th>Email</th><th>Роль</th><th>Дата</th><th></th></tr></thead><tbody>';
  users.forEach(function(u){html+='<tr><td style="font-weight:600">'+(u.name||'—')+'</td><td style="font-size:12px;color:var(--mid)">'+(u.email||'—')+'</td><td><span class="badge '+(rB[u.role]||'badge-gray')+'">'+(rL[u.role]||u.role)+'</span></td><td style="font-size:12px">'+fmtDate(u.created_at)+'</td><td><button class="btn btn-sm btn-danger" data-uid="'+u.id+'" onclick="deleteUser(this.dataset.uid)">🗑️</button></td></tr>';});
  html+='</tbody></table></div></div>';
}else{html+='<div class="card" style="text-align:center;color:var(--mid);padding:40px"><div style="font-size:48px;margin-bottom:12px">👥</div><div style="font-weight:600;margin-bottom:8px">Нет пользователей</div><div style="font-size:13px">Создайте аккаунты для сотрудников склада и маркетинга</div><button class="btn btn-primary" style="margin-top:16px" onclick="openAddUser()">+ Создать первый аккаунт</button></div>';}
c.innerHTML=html;}

function openAddUser(){openModal('<div class="modal-title">👤 Новый пользователь</div><div class="form-row"><label class="label">Имя *</label><input class="input" id="un" placeholder="Иван Иванов"/></div><div class="form-row"><label class="label">Email *</label><input class="input" id="ue" type="email" placeholder="ivan@example.com"/></div><div class="form-row"><label class="label">Пароль *</label><input class="input" id="up" type="password" placeholder="Минимум 6 символов"/></div><div class="form-row"><label class="label">Роль *</label><select class="select" id="ur"><option value="warehouse">🏭 Склад</option><option value="marketing">📣 Маркетинг</option><option value="admin">👑 Администратор</option></select></div><div class="modal-footer"><button class="btn btn-primary" onclick="saveUser()">Создать аккаунт</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');}

async function saveUser(){const name=document.getElementById('un').value.trim();const email=document.getElementById('ue').value.trim();const pass=document.getElementById('up').value;const role=document.getElementById('ur').value;if(!name||!email||!pass){toast('Заполните все поля','error');return;}if(pass.length<6){toast('Пароль минимум 6 символов','error');return;}const{data,error}=await sb.auth.signUp({email,password:pass,options:{data:{name,role}}});if(error){toast(error.message,'error');return;}await sb.from('user_profiles').upsert({email,name,role});toast('Аккаунт создан! Email: '+email);closeModal();renderPage('users');}

async function deleteUser(id){if(!confirm('Удалить пользователя?'))return;await sb.from('user_profiles').delete().eq('id',id);toast('Удалён');renderPage('users');}

async function renderRequests(c){
const{data:tasks}=await sb.from('tasks').select('*').eq('created_by_name',currentUser.user_metadata?.name).order('created_at',{ascending:false});
const tL={receipt:'Приёмка',shipment:'Отгрузка',writeoff:'Списание'};
const isAdmin=currentUser.user_metadata?.role==='admin';
let html='<div class="page-title">Мои заявки</div>';
if(tasks&&tasks.length){
  html+='<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>№ Заявки</th><th>Тип</th><th>Дата</th><th>Статус</th>'+(isAdmin?'<th></th>':'')+'</tr></thead><tbody>';
  tasks.forEach(function(t){
    html+='<tr><td style="font-weight:700;font-family:monospace">'+t.request_number+'</td>';
    html+='<td>'+(tL[t.type]||t.type)+'</td>';
    html+='<td>'+fmtDT(t.created_at)+'</td>';
    html+='<td><span class="badge '+(t.status==='Выполнена'?'badge-green':t.status==='Новая'?'badge-amber':'badge-blue')+'">'+t.status+'</span></td>';
    if(isAdmin)html+='<td><button class="btn btn-sm btn-danger" data-tid="'+t.id+'" onclick="deleteTask(this.dataset.tid,\'requests\')">🗑️</button></td>';
    html+='</tr>';
  });
  html+='</tbody></table></div></div>';
}else{html+='<div class="card" style="text-align:center;color:var(--mid);padding:40px">Заявок пока нет</div>';}
c.innerHTML=html;}

function toggleReqMenu(id){const m=document.getElementById(id);if(!m)return;const isOpen=m.style.display!=='none';document.querySelectorAll('[id$="-menu"]').forEach(function(el){el.style.display='none';});if(!isOpen){m.style.display='block';document.addEventListener('click',function handler(e){if(!e.target.closest('[id$="-menu"]')&&!e.target.closest('.btn')){m.style.display='none';document.removeEventListener('click',handler);}});}}

async function renderNewReceiptReq(c){
const cats=await getCats();window._receiptCats=cats;
const{data:prevTasks}=await sb.from('tasks').select('*').eq('type','receipt').eq('created_by_name',currentUser.user_metadata?.name).order('created_at',{ascending:false}).limit(5);
let prevHtml='';
if(prevTasks&&prevTasks.length){prevHtml='<div style="margin-top:24px"><div class="label" style="margin-bottom:10px">Последние заявки</div>';prevTasks.forEach(function(t){const sc=t.status==='Выполнена'?'badge-green':t.status==='Новая'?'badge-amber':'badge-blue';prevHtml+='<div style="display:flex;justify-content:space-between;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:6px;font-size:13px"><span style="font-weight:700;font-family:monospace">'+t.request_number+'</span><span>'+fmtDT(t.created_at)+'</span><span class="badge '+sc+'">'+t.status+'</span></div>';});prevHtml+='</div>';}
let html='<div class="page-title">Заявка на приёмку<div style="position:relative"><button class="btn btn-primary btn-sm" onclick="toggleReqMenu(\'receipt-menu\')">+ Создать заявку ▾</button>';
html+='<div id="receipt-menu" style="display:none;position:absolute;right:0;top:110%;background:var(--bg2);border:1px solid var(--border);border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.4);z-index:100;min-width:200px;overflow:hidden">';
html+='<button class="dropdown-item" onclick="toggleReqMenu(\'receipt-menu\');openManualReceiptForm()">📝 Создать вручную</button>';
html+='<button class="dropdown-item" onclick="toggleReqMenu(\'receipt-menu\');importExcel()">📂 Загрузить файл</button>';
html+='</div></div></div>'+prevHtml;
c.innerHTML=html;}

async function renderNewShipmentReq(c){
const{data:prods}=await sb.from('products').select('id,name,article').eq('status','На складе');
let opts='';(prods||[]).forEach(function(p){opts+='<option value="'+p.id+'">'+p.name+' ('+p.article+')</option>';});
window._shriOpts=opts;
const{data:prevTasks}=await sb.from('tasks').select('*').eq('type','shipment').eq('created_by_name',currentUser.user_metadata?.name).order('created_at',{ascending:false}).limit(5);
let prevHtml='';
if(prevTasks&&prevTasks.length){prevHtml='<div style="margin-top:24px"><div class="label" style="margin-bottom:10px">Последние заявки</div>';prevTasks.forEach(function(t){const sc=t.status==='Выполнена'?'badge-green':t.status==='Новая'?'badge-amber':'badge-blue';prevHtml+='<div style="display:flex;justify-content:space-between;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:6px;font-size:13px"><span style="font-weight:700;font-family:monospace">'+t.request_number+'</span><span>'+fmtDT(t.created_at)+'</span><span class="badge '+sc+'">'+t.status+'</span></div>';});prevHtml+='</div>';}
let html='<div class="page-title">Заявка на отгрузку<div style="position:relative"><button class="btn btn-primary btn-sm" onclick="toggleReqMenu(\'shipment-menu\')">+ Создать заявку ▾</button>';
html+='<div id="shipment-menu" style="display:none;position:absolute;right:0;top:110%;background:var(--bg2);border:1px solid var(--border);border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.4);z-index:100;min-width:200px;overflow:hidden">';
html+='<button class="dropdown-item" onclick="toggleReqMenu(\'shipment-menu\');openManualShipmentForm()">📝 Создать вручную</button>';
html+='<button class="dropdown-item" onclick="toggleReqMenu(\'shipment-menu\');importExcel()">📂 Загрузить файл</button>';
html+='</div></div></div>'+prevHtml;
c.innerHTML=html;}

async function renderNewWriteoffReq(c){
const{data:prods}=await sb.from('products').select('id,name,article');
let opts='';(prods||[]).forEach(function(p){opts+='<option value="'+p.id+'">'+p.name+' ('+p.article+')</option>';});
window._woriOpts=opts;
const{data:prevTasks}=await sb.from('tasks').select('*').eq('type','writeoff').eq('created_by_name',currentUser.user_metadata?.name).order('created_at',{ascending:false}).limit(5);
let prevHtml='';
if(prevTasks&&prevTasks.length){prevHtml='<div style="margin-top:24px"><div class="label" style="margin-bottom:10px">Последние заявки</div>';prevTasks.forEach(function(t){const sc=t.status==='Выполнена'?'badge-green':t.status==='Новая'?'badge-amber':'badge-blue';prevHtml+='<div style="display:flex;justify-content:space-between;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:6px;font-size:13px"><span style="font-weight:700;font-family:monospace">'+t.request_number+'</span><span>'+fmtDT(t.created_at)+'</span><span class="badge '+sc+'">'+t.status+'</span></div>';});prevHtml+='</div>';}
let html='<div class="page-title">Заявка на списание<div style="position:relative"><button class="btn btn-primary btn-sm" onclick="toggleReqMenu(\'writeoff-menu\')">+ Создать заявку ▾</button>';
html+='<div id="writeoff-menu" style="display:none;position:absolute;right:0;top:110%;background:var(--bg2);border:1px solid var(--border);border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.4);z-index:100;min-width:200px;overflow:hidden">';
html+='<button class="dropdown-item" onclick="toggleReqMenu(\'writeoff-menu\');openManualWriteoffForm()">📝 Создать вручную</button>';
html+='<button class="dropdown-item" onclick="toggleReqMenu(\'writeoff-menu\');importExcel()">📂 Загрузить файл</button>';
html+='</div></div></div>'+prevHtml;
c.innerHTML=html;}
function openManualReceiptForm(){
const cats=window._receiptCats||[];
const catsOpts=cats.map(function(c){return'<option value="'+c.name+'">'+c.name+'</option>';}).join('');
window._manualRowCount=0;
openModal('<div class="modal-title">📝 Заявка на приёмку вручную</div><div style="display:grid;grid-template-columns:2fr 1fr 1fr 70px 1fr 2fr 30px;gap:6px;margin-bottom:6px;font-size:11px;font-weight:600;color:var(--mid);padding:0 2px"><span>Наименование</span><span>Артикул</span><span>Категория</span><span>Кол-во</span><span>Ячейка</span><span>Описание</span><span></span></div><div id="manual-rows-body"></div><button class="btn btn-sm btn-secondary" style="margin-bottom:16px" onclick="addManualRow()">+ Добавить строку</button><div class="modal-footer"><button class="btn btn-primary" onclick="submitManualReceipt()">Отправить заявку →</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');
window._manualCatsOpts=catsOpts;
addManualRow();}

function addManualRow(){
window._manualRowCount=(window._manualRowCount||0)+1;
const n=window._manualRowCount;
const row=document.createElement('div');
row.id='mrow-'+n;
row.className='manual-row';
row.innerHTML='<input class="input" id="mrn-'+n+'" placeholder="Наименование *" style="font-size:12px"/>'+
'<input class="input" id="mra-'+n+'" placeholder="Артикул" style="font-size:12px"/>'+
'<select class="select" id="mrc-'+n+'" style="font-size:12px"><option value="">—</option>'+(window._manualCatsOpts||'')+'</select>'+
'<input class="input" id="mrq-'+n+'" type="number" value="1" min="1" style="font-size:12px"/>'+
'<input class="input" id="mrcel-'+n+'" placeholder="Ячейка" style="font-size:12px"/>'+
'<input class="input" id="mrd-'+n+'" placeholder="Описание" style="font-size:12px"/>'+
'<button class="btn btn-sm btn-danger" onclick="this.closest(\'[id^=mrow]\').remove()" style="padding:6px">✕</button>';
document.getElementById('manual-rows-body').appendChild(row);}

async function submitManualReceipt(){
const rows=[];
document.querySelectorAll('[id^="mrow-"]').forEach(function(row){
  const n=row.id.replace('mrow-','');
  const name=document.getElementById('mrn-'+n)?.value.trim();
  if(!name)return;
  rows.push({Наименование:name,Артикул:document.getElementById('mra-'+n)?.value.trim()||'',Категория:document.getElementById('mrc-'+n)?.value||'',Количество:parseInt(document.getElementById('mrq-'+n)?.value)||1,Ячейка:document.getElementById('mrcel-'+n)?.value.trim()||'',Описание:document.getElementById('mrd-'+n)?.value.trim()||''});
});
if(!rows.length){toast('Добавьте хотя бы одну строку','error');return;}
closeModal();
await importAsRequests(rows);}

function openManualShipmentForm(){
const opts=window._shriOpts||'';
openModal('<div class="modal-title">📝 Заявка на отгрузку вручную</div><div id="shri-rows"><div class="cargo-row" id="shrim-1"><div class="cargo-num">1</div><select class="select" id="shrip-1"><option value="">— товар —</option>'+opts+'</select><input class="input" id="shriq-1" type="number" value="1" min="1" style="width:80px"/></div></div><button class="btn btn-sm btn-secondary" style="margin:10px 0 14px" onclick="addShriRow()">+ Добавить</button><div class="form-row"><label class="label">Куда / для чего *</label><input class="input" id="shri-dest" placeholder="Выставка, магазин..."/></div><div class="form-row"><label class="label">Примечание</label><input class="input" id="shri-note"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="submitShipmentReq()">Отправить →</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');
window._shriRows=1;}

function addShriRow(){window._shriRows=(window._shriRows||1)+1;const n=window._shriRows;const div=document.createElement('div');div.className='cargo-row';div.id='shrim-'+n;div.innerHTML='<div class="cargo-num">'+n+'</div><select class="select" id="shrip-'+n+'"><option value="">— товар —</option>'+(window._shriOpts||'')+'</select><input class="input" id="shriq-'+n+'" type="number" value="1" min="1" style="width:80px"/><button class="btn btn-sm btn-danger" onclick="document.getElementById(\'shrim-'+n+'\').remove()">✕</button>';document.getElementById('shri-rows').appendChild(div);}

async function submitShipmentReq(){
const dest=document.getElementById('shri-dest')?.value.trim();
if(!dest){toast('Укажите куда/для чего','error');return;}
const reqNum=genReqNum();
const{data:task}=await sb.from('tasks').insert({type:'shipment',status:'Новая',request_number:reqNum,created_by_name:currentUser.user_metadata?.name,assigned_to:'warehouse',note:dest+' / '+document.getElementById('shri-note')?.value}).select().single();
if(!task){toast('Ошибка создания заявки','error');return;}
for(let i=1;i<=window._shriRows;i++){const prodId=document.getElementById('shrip-'+i)?.value;const qty=parseInt(document.getElementById('shriq-'+i)?.value)||1;if(prodId)await sb.from('task_items').insert({task_id:task.id,product_id:prodId,quantity_required:qty,quantity_collected:0,is_collected:false});}
toast('Заявка '+reqNum+' отправлена!');closeModal();renderPage('requests');}

function openManualWriteoffForm(){
const opts=window._woriOpts||'';
openModal('<div class="modal-title">📝 Заявка на списание вручную</div><div id="wori-rows"><div class="cargo-row" id="worim-1"><div class="cargo-num">1</div><select class="select" id="worip-1"><option value="">— товар —</option>'+opts+'</select><input class="input" id="worin-1" placeholder="Причина" style="flex:1"/></div></div><button class="btn btn-sm btn-secondary" style="margin:10px 0 14px" onclick="addWoriRow()">+ Добавить</button><div class="form-row"><label class="label">Примечание</label><input class="input" id="wori-note"/></div><div class="modal-footer"><button class="btn btn-primary" onclick="submitWriteoffReq()">Отправить →</button><button class="btn btn-secondary" onclick="closeModal()">Отмена</button></div>');
window._woriRows=1;}

function addWoriRow(){window._woriRows=(window._woriRows||1)+1;const n=window._woriRows;const div=document.createElement('div');div.className='cargo-row';div.id='worim-'+n;div.innerHTML='<div class="cargo-num">'+n+'</div><select class="select" id="worip-'+n+'"><option value="">— товар —</option>'+(window._woriOpts||'')+'</select><input class="input" id="worin-'+n+'" placeholder="Причина" style="flex:1"/><button class="btn btn-sm btn-danger" onclick="document.getElementById(\'worim-'+n+'\').remove()">✕</button>';document.getElementById('wori-rows').appendChild(div);}

async function submitWriteoffReq(){
const reqNum=genReqNum();
const{data:task}=await sb.from('tasks').insert({type:'writeoff',status:'Новая',request_number:reqNum,created_by_name:currentUser.user_metadata?.name,assigned_to:'warehouse',note:document.getElementById('wori-note')?.value}).select().single();
if(!task){toast('Ошибка','error');return;}
for(let i=1;i<=window._woriRows;i++){const prodId=document.getElementById('worip-'+i)?.value;const reason=document.getElementById('worin-'+i)?.value||'';if(prodId)await sb.from('task_items').insert({task_id:task.id,product_id:prodId,quantity_required:1,quantity_collected:0,is_collected:false,note:reason});}
toast('Заявка '+reqNum+' отправлена!');closeModal();renderPage('requests');}

async function importAsRequests(rows){
const reqNum=genReqNum();
const{data:task,error}=await sb.from('tasks').insert({type:'receipt',status:'Новая',request_number:reqNum,created_by_name:currentUser.user_metadata?.name,assigned_to:'warehouse',note:'Импорт: '+rows.length+' товаров'}).select().single();
if(error){toast('Ошибка создания заявки','error');return;}
let cats=await getCats();
for(let i=0;i<rows.length;i++){
  const row=rows[i];
  const name=row['Наименование']||row['Название']||row['name']||'';
  if(!name)continue;
  const catName=(row['Категория']||'').trim();
  let cat=cats.find(function(c){return c.name.toLowerCase()===catName.toLowerCase();});
  if(!cat&&catName){const{data:newCat}=await sb.from('categories').insert({name:catName}).select().single();if(newCat){cats.push(newCat);cat=newCat;}}
  const article=row['Артикул']||row['article']||genArticle(catName);
  const{data:prod}=await sb.from('products').upsert({name,article,category_id:cat?.id||null,condition:'Новый',status:'Ожидает приёмки',quantity:parseInt(row['Количество'])||1,description:row['Описание']||''},{onConflict:'article'}).select().single();
  if(prod)await sb.from('task_items').insert({task_id:task.id,product_id:prod.id,quantity_required:parseInt(row['Количество'])||1,quantity_collected:0,is_collected:false});}
toast('Заявка '+reqNum+' отправлена на склад!');await buildSidebar();renderPage('requests');}

async function importExcel(){
const session=await sb.auth.getSession();
if(!session?.data?.session){toast('Войдите в систему','error');return;}
const input=document.createElement('input');input.type='file';input.accept='.xlsx,.xls,.csv';
input.onchange=async function(){
  const file=input.files[0];if(!file)return;
  toast('Загружаю...');
  const data=await file.arrayBuffer();
  const wb=XLSX.read(data);
  const ws=wb.Sheets[wb.SheetNames[0]];
  const rows=XLSX.utils.sheet_to_json(ws);
  if(!rows.length){toast('Файл пустой','error');return;}
  if(currentRole==='marketing'){await importAsRequests(rows);return;}
  let cats=await getCats();let imported=0;let errors=0;
  for(let i=0;i<rows.length;i++){
    const row=rows[i];
    const name=row['Наименование']||row['Название']||row['name']||'';
    if(!name)continue;
    const catName=(row['Категория']||row['category']||'').trim();
    let cat=cats.find(function(c){return c.name.toLowerCase()===catName.toLowerCase();});
    if(!cat&&catName){const{data:newCat}=await sb.from('categories').insert({name:catName}).select().single();if(newCat){cats.push(newCat);cat=newCat;}}
    const article=row['Артикул']||row['article']||genArticle(catName);
    const cellLabel=(row['Ячейка']||row['Локация']||'').trim();
    let cellId=null;
    if(cellLabel){const{data:cellData}=await sb.from('cells').select('id').eq('label',cellLabel).maybeSingle();if(cellData)cellId=cellData.id;}
    const{error}=await sb.from('products').upsert({name,article,category_id:cat?.id||null,cell_id:cellId,condition:'Новый',status:'На складе',quantity:parseInt(row['Количество'])||1,description:row['Описание']||''},{onConflict:'article'});
    if(error)errors++;else imported++;}
  if(errors>0)toast('Импортировано: '+imported+', ошибок: '+errors,'error');
  else toast('Импортировано: '+imported+' товаров');
  renderPage('products');};
input.click();}

sb.auth.onAuthStateChange(function(event,session){if(session?.user)initUser(session.user);});
