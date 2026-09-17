const data = window.VINDICTUS_DATA;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const professionMap = Object.fromEntries(data.professions.map(p => [p.id, p]));

function crafterMembers(recipeId){
  return data.members.filter(m => m.professions.some(p => p.recipes.includes(recipeId)));
}
function recipeCoverage(recipe){
  const n = crafterMembers(recipe.id).length;
  if(n===0) return {key:"missing", label:"Missing", count:n};
  if(n===1) return {key:"rare", label:"Rare", count:n};
  if(n<=3) return {key:"uncommon", label:"Uncommon", count:n};
  return {key:"covered", label:"Well covered", count:n};
}
function uniqueKnownRecipeIds(){
  const ids = new Set();
  data.members.forEach(m => m.professions.forEach(p => p.recipes.forEach(r => ids.add(r))));
  return ids;
}
function renderStats(){
  const known = uniqueKnownRecipeIds().size;
  const missing = data.recipes.filter(r => crafterMembers(r.id).length===0).length;
  const single = data.recipes.filter(r => crafterMembers(r.id).length===1).length;
  const stats = [[data.members.length,"Crafters"],[known,"Known Recipes"],[missing,"Missing Recipes"],[single,"Single-Crafter Recipes"]];
  $("#stats").innerHTML = stats.map(([v,l])=>`<article class="stat-card"><strong>${v}</strong><span>${l}</span></article>`).join("");
  $("#admin-member-count").textContent = data.members.length;
  $("#admin-gap-count").textContent = `${missing + single} gaps`;
}
function professionCrafterCount(id){
  return data.members.filter(m => m.professions.some(p => p.profession===id)).length;
}
function renderProfessionCards(target, limit){
  const items = limit ? data.professions.slice(0,limit) : data.professions;
  target.innerHTML = items.map(p=>`
    <button class="profession-card" data-profession="${p.id}">
      <span class="count">${professionCrafterCount(p.id)} crafters</span>
      <div class="icon">${p.icon}</div>
      <h4>${p.name}</h4>
      <p>${p.description}</p>
    </button>`).join("");
  target.querySelectorAll(".profession-card").forEach(btn=>{
    btn.addEventListener("click",()=>{
      showView("professions");
      renderProfessionDetail(btn.dataset.profession);
      window.scrollTo({top:0,behavior:"smooth"});
    });
  });
}
function renderRecent(){
  const rows = data.recipes.filter(r=>r.learned).sort((a,b)=>new Date(b.learned)-new Date(a.learned)).slice(0,6);
  $("#recent-feed").innerHTML = rows.map(r=>{
    const c = crafterMembers(r.id)[0];
    const d = new Date(r.learned);
    return `<div class="feed-item"><div><strong>${c ? c.discordName : "Guild member"}</strong> learned <strong>${r.name}</strong><br><small>${professionMap[r.profession].name}</small></div><small>${d.toLocaleDateString()}</small></div>`;
  }).join("");
}
function renderCoverage(){
  const rows = data.recipes.map(r=>[r,recipeCoverage(r)]).sort((a,b)=>a[1].count-b[1].count).slice(0,7);
  $("#coverage-list").innerHTML = rows.map(([r,c])=>`
    <div class="coverage-item">
      <div><strong>${r.name}</strong><br><small>${professionMap[r.profession].name}</small></div>
      <span class="badge ${c.key}">${c.count} crafter${c.count===1?"":"s"}</span>
    </div>`).join("");
}
function populateFilters(){
  $("#profession-filter").innerHTML += data.professions.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");
}
function recipeMatches(r,q){
  q=q.trim().toLowerCase();
  if(!q) return true;
  return [r.name,r.category,professionMap[r.profession].name,r.details].some(x=>x.toLowerCase().includes(q));
}
function renderRecipeResults(query="", target=$("#recipe-results")){
  const pf = $("#profession-filter")?.value || "";
  const cf = $("#coverage-filter")?.value || "";
  const rows = data.recipes.filter(r=>{
    const c = recipeCoverage(r);
    return recipeMatches(r,query) && (!pf || r.profession===pf) && (!cf || c.key===cf);
  }).sort((a,b)=>a.name.localeCompare(b.name));
  target.innerHTML = rows.length ? rows.map(r=>{
    const crafters = crafterMembers(r.id);
    const cov = recipeCoverage(r);
    return `<article class="recipe-card" title="${r.details}">
      <div class="item-icon">${r.icon}</div>
      <div>
        <h4>${r.name}</h4>
        <p>${professionMap[r.profession].name} • ${r.category}</p>
        <div class="crafter-list">
          ${crafters.length ? crafters.map(m=>`<button class="crafter-chip" data-member="${m.id}">${m.discordName}</button>`).join("") : `<span class="muted">No Vindictus crafter currently knows this recipe.</span>`}
        </div>
      </div>
      <span class="badge ${cov.key}">${cov.count} crafter${cov.count===1?"":"s"}</span>
    </article>`;
  }).join("") : `<div class="notice">No recipes match your search.</div>`;
  target.querySelectorAll("[data-member]").forEach(b=>b.addEventListener("click",()=>openMember(b.dataset.member)));
}
function renderHeroResults(q){
  const target=$("#hero-results");
  if(!q.trim()){target.innerHTML="";return}
  const rows=data.recipes.filter(r=>recipeMatches(r,q)).slice(0,4);
  target.innerHTML=rows.map(r=>{
    const c=recipeCoverage(r);
    return `<div class="quick-hit"><span>${r.name}</span><span>${c.count} crafter${c.count===1?"":"s"}</span></div>`;
  }).join("") || `<div class="quick-hit"><span>No matches</span><span>0</span></div>`;
}
function renderProfessionDetail(id){
  const p=professionMap[id];
  const recipes=data.recipes.filter(r=>r.profession===id);
  const members=data.members.filter(m=>m.professions.some(x=>x.profession===id));
  const known=recipes.filter(r=>crafterMembers(r.id).length>0).length;
  const missing=recipes.length-known;
  const single=recipes.filter(r=>crafterMembers(r.id).length===1).length;
  $("#profession-detail").innerHTML=`
    <section class="panel profession-detail">
      <div class="section-heading compact"><div><div class="eyebrow">${p.name}</div><h3>${p.icon} Profession Dashboard</h3></div></div>
      <div class="dashboard-stats">
        <div class="mini-stat"><b>${members.length}</b><span>Crafters</span></div>
        <div class="mini-stat"><b>${known}</b><span>Known Recipes</span></div>
        <div class="mini-stat"><b>${missing}</b><span>Missing</span></div>
        <div class="mini-stat"><b>${single}</b><span>Single-Crafter</span></div>
      </div>
      <div class="tab-row">
        <button class="tab-button active" data-tab="recipes">Recipes</button>
        <button class="tab-button" data-tab="crafters">Crafters</button>
      </div>
      <div id="profession-tab-content"></div>
    </section>`;
  const content=$("#profession-tab-content");
  function renderTab(tab){
    $$(".tab-button").forEach(x=>x.classList.toggle("active",x.dataset.tab===tab));
    if(tab==="recipes"){
      content.innerHTML=`<div class="recipe-results">${recipes.map(r=>{
        const cov=recipeCoverage(r), crafters=crafterMembers(r.id);
        return `<article class="recipe-card" title="${r.details}">
          <div class="item-icon">${r.icon}</div><div><h4>${r.name}</h4><p>${r.category}</p>
          <div class="crafter-list">${crafters.length?crafters.map(m=>`<button class="crafter-chip" data-member="${m.id}">${m.discordName}</button>`).join(""):`<span class="muted">No current crafter</span>`}</div></div>
          <span class="badge ${cov.key}">${cov.count}</span></article>`;
      }).join("")}</div>`;
      content.querySelectorAll("[data-member]").forEach(b=>b.addEventListener("click",()=>openMember(b.dataset.member)));
    } else {
      content.innerHTML=members.map(m=>{
        const mp=m.professions.find(x=>x.profession===id);
        return `<div class="feed-item"><div><strong>${m.discordName}</strong> • ${mp.character || m.mainCharacter}<br><small>${mp.skill}/${p.maxSkill}${mp.specialization?` • ${mp.specialization}`:""}</small></div><button class="crafter-chip" data-member="${m.id}">Profile</button></div>`;
      }).join("");
      content.querySelectorAll("[data-member]").forEach(b=>b.addEventListener("click",()=>openMember(b.dataset.member)));
    }
  }
  $$(".tab-button").forEach(btn=>btn.addEventListener("click",()=>renderTab(btn.dataset.tab)));
  renderTab("recipes");
}
function openMember(id){
  const m=data.members.find(x=>x.id===id);
  if(!m)return;
  $("#member-modal-content").innerHTML=`
    <div class="profile-head"><div class="avatar">${m.avatar}</div><div><div class="eyebrow">${m.role}</div><h3>${m.discordName}</h3><p>${m.mainCharacter}</p></div></div>
    <div>${m.professions.map(p=>{
      const prof=professionMap[p.profession];
      return `<div class="profession-line"><strong>${prof.icon} ${prof.name}</strong><br><small>${p.character || m.mainCharacter} • ${p.skill}/${prof.maxSkill}${p.specialization?` • ${p.specialization}`:""}</small><br><small>${p.recipes.length} known recipes</small></div>`;
    }).join("")}</div>`;
  $("#member-modal").showModal();
}
function renderDemoProfile(){
  const m=data.members[0];
  $("#demo-professions").innerHTML=m.professions.map(p=>{
    const prof=professionMap[p.profession];
    return `<div class="profession-line"><strong>${prof.icon} ${prof.name}</strong><br><small>${p.character} • ${p.skill}/${prof.maxSkill}${p.specialization?` • ${p.specialization}`:""} • ${p.recipes.length} recipes</small></div>`;
  }).join("");
}
function showView(name){
  $$(".view").forEach(v=>v.classList.toggle("active",v.id===`view-${name}`));
  $$(".nav-link,.mobile-link").forEach(n=>n.classList.toggle("active",n.dataset.view===name));
  const titles={home:"Find a crafter",search:"Recipe search",professions:"Profession dashboards",profile:"Member profile",admin:"Guild administration"};
  $("#page-title").textContent=titles[name]||"Vindictus";
}
function wireNavigation(){
  $$("[data-view]").forEach(x=>x.addEventListener("click",()=>showView(x.dataset.view)));
  $(".modal-close").addEventListener("click",()=>$("#member-modal").close());
  $("#member-modal").addEventListener("click",e=>{ if(e.target===$("#member-modal")) $("#member-modal").close() });
  $("#discord-login").addEventListener("click",()=>alert("Discord OAuth placeholder: connect Supabase + Discord in Version 1B."));
  $("#profile-login").addEventListener("click",()=>alert("Discord OAuth placeholder: connect Supabase + Discord in Version 1B."));
}
function wireSearch(){
  $("#hero-search").addEventListener("input",e=>renderHeroResults(e.target.value));
  $("#hero-search-btn").addEventListener("click",()=>{
    $("#search-page-input").value=$("#hero-search").value;
    showView("search"); renderRecipeResults($("#hero-search").value);
  });
  $("#search-page-btn").addEventListener("click",()=>renderRecipeResults($("#search-page-input").value));
  $("#search-page-input").addEventListener("input",e=>renderRecipeResults(e.target.value));
  $("#profession-filter").addEventListener("change",()=>renderRecipeResults($("#search-page-input").value));
  $("#coverage-filter").addEventListener("change",()=>renderRecipeResults($("#search-page-input").value));
}
renderStats();
renderProfessionCards($("#profession-grid"),4);
renderProfessionCards($("#profession-grid-full"));
renderRecent();
renderCoverage();
populateFilters();
renderRecipeResults();
renderDemoProfile();
wireNavigation();
wireSearch();
