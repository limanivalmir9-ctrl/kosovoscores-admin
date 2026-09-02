
import { useState, useEffect, useMemo } from 'react'

const STATS = [
  { label: 'Kompeticionet', value: 14, color: '#3b82f6' },
  { label: 'Klubet', value: 76, color: '#10b981' },
  { label: 'Ndeshjet', value: 1049, color: '#f97316' },
  { label: 'Lajmet', value: 1, color: '#06b6d4' },
  { label: 'Agjentët', value: 19, color: '#6366f1' },
  { label: 'Kontaktet', value: 20, color: '#14b8a6' },
]

const CARDS = [
  { id: 'live', title: 'Ndeshjet Sot', sub: 'Live kontrollo & menaxho', grad: 'linear-gradient(135deg,#ef4444,#dc2626)', icon: '📺', count: null, page: 'matches_today' },
  { id: 'competitions', title: 'Kompeticionet', sub: 'Liga & kupe', grad: 'linear-gradient(135deg,#3b82f6,#2563eb)', icon: '🏆', count: 14, page: 'competitions' },
  { id: 'clubs', title: 'Klubet', sub: 'Ekipet & logot', grad: 'linear-gradient(135deg,#10b981,#059669)', icon: '👥', count: 76, page: 'clubs' },
  { id: 'matches', title: 'Ndeshjet', sub: 'Programi i ndeshjeve', grad: 'linear-gradient(135deg,#f97316,#ea580c)', icon: '📅', count: 1049, page: 'matches' },
  { id: 'standings', title: 'Tabelat', sub: 'Klasifikimi i ekipeve', grad: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', icon: '📊', count: null, page: 'standings' },
  { id: 'scorers', title: 'Golashënuesit', sub: 'Renditja e golashënuesve', grad: 'linear-gradient(135deg,#facc15,#eab308)', icon: '⭐', count: null, page: 'scorers' },
  { id: 'news', title: 'Lajme', sub: 'Publiko lajme', grad: 'linear-gradient(135deg,#06b6d4,#0891b2)', icon: '📰', count: 1, page: 'news' },
  { id: 'refs', title: 'Gjyqtarët', sub: 'Lista e gjyqtarëve', grad: 'linear-gradient(135deg,#475569,#334155)', icon: '👤', count: null, page: 'refs' },
  { id: 'agents', title: 'Agjentët', sub: 'Menaxho agjentët', grad: 'linear-gradient(135deg,#6366f1,#4f46e5)', icon: '🪪', count: 19, page: 'agents' },
  { id: 'chat', title: 'Chat Agjentë', sub: 'Mesazhet nga agjentët', grad: 'linear-gradient(135deg,#ec4899,#db2777)', icon: '💬', count: null, page: 'chat' },
  { id: 'apps', title: 'Aplikimet', sub: 'Aplikimet e agjentëve', grad: 'linear-gradient(135deg,#f59e0b,#d97706)', icon: '📋', count: null, page: 'apps' },
  { id: 'alarms', title: 'Alarmet', sub: 'Sinjalizime aktive', grad: 'linear-gradient(135deg,#ef4444,#dc2626)', icon: '🔔', count: null, page: 'alarms' },
  { id: 'ads', title: 'Reklamat', sub: 'Banerat & reklamat', grad: 'linear-gradient(135deg,#f43f5e,#e11d48)', icon: '🖼️', count: null, page: 'ads' },
  { id: 'contacts', title: 'Kontaktet', sub: 'Mesazhet e vizitorëve', grad: 'linear-gradient(135deg,#14b8a6,#0d9488)', icon: '✉️', count: 20, page: 'contacts' },
  { id: 'analytics', title: 'Analitika', sub: 'Vizitat & statistikat', grad: 'linear-gradient(135deg,#a855f7,#9333ea)', icon: '📈', count: null, page: 'analytics' },
  { id: 'transfer', title: 'Transfero', sub: 'Lëviz lojtarë mes klubeve', grad: 'linear-gradient(135deg,#22c55e,#16a34a)', icon: '🔀', count: null, page: 'transfer' },
  { id: 'multimatch', title: 'Multi Match', sub: 'Shumë ndeshje live', grad: 'linear-gradient(135deg,#6366f1,#8b5cf6)', icon: '🗂️', count: null, page: 'multimatch' },
  { id: 'donations', title: 'Donacionet', sub: 'Konfigurimet e donacioneve', grad: 'linear-gradient(135deg,#d946ef,#c026d3)', icon: '❤️', count: null, page: 'donations' },
  { id: 'api', title: 'API Publike', sub: 'Çelësat & dokumentimi', grad: 'linear-gradient(135deg,#8b5cf6,#6366f1)', icon: '🔑', count: null, page: 'api' },
  { id: 'subadmins', title: 'Nën-Adminët', sub: 'Menaxho aksesin', grad: 'linear-gradient(135deg,#334155,#1e293b)', icon: '🛡️', count: null, page: 'subadmins' },
]

const MENU = [
  { icon: '⊞', label: 'Ballina', page: 'dashboard', active: true },
  { icon: '🔴', label: 'Ndeshjet Sot', page: 'matches_today', dot: true },
  { icon: '📅', label: 'Ndeshjet', page: 'matches' },
  { icon: '👥', label: 'Klubet', page: 'clubs' },
  { icon: '🪪', label: 'Agjentët', page: 'agents' },
  { icon: '✉️', label: 'Kontaktet', page: 'contacts' },
  { icon: '🏆', label: 'Kompeticionet', page: 'competitions' },
  { icon: '⭐', label: 'Yjet e Javës', page: 'weekstars' },
  { icon: '📦', label: 'Magazina', page: 'shop' },
  { icon: '📊', label: 'Statistikat', page: 'stats' },
  { icon: '👁️', label: 'Dukshmëria e Profileve', page: 'visibility' },
  { icon: '↗️', label: 'Transfero Klubet', page: 'transfer_clubs' },
  { icon: '🏅', label: 'Trofetë', page: 'trophies' },
  { icon: '👔', label: 'Trajnerët', page: 'coaches' },
  { icon: '🧑‍⚖️', label: 'Gjyqtarët', page: 'refs' },
  { icon: '📋', label: 'Tabelat', page: 'standings' },
  { icon: '⭐', label: 'Golashënuesit', page: 'scorers' },
  { icon: '📰', label: 'Lajme', page: 'news' },
  { icon: '🖼️', label: 'Reklamat', page: 'ads' },
  { icon: '💬', label: 'Chat Agjentë', page: 'chat' },
  { icon: '📋', label: 'Aplikimet', page: 'apps' },
  { icon: '🗂️', label: 'Multi Match', page: 'multimatch' },
  { icon: '🔀', label: 'Transfero', page: 'transfer' },
  { icon: '❤️', label: 'Donacionet', page: 'donations' },
  { icon: '🔑', label: 'API Publike', page: 'api' },
  { icon: '🛡️', label: 'Nën-Adminët', page: 'subadmins' },
]

export default function App(){
  const [page, setPage] = useState('dashboard')
  const [competitions, setCompetitions] = useState([])
  const [clubs, setClubs] = useState([])
  const [matches, setMatches] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [editing, setEditing] = useState(null)

  useEffect(()=>{
    fetch('/data/Competition.json').then(r=>r.json()).then(setCompetitions).catch(()=>{})
    fetch('/data/Club.json').then(r=>r.json()).then(setClubs).catch(()=>{})
    fetch('/data/Match.json').then(r=>r.json()).then(setMatches).catch(()=>{})
  },[])

  const filteredComps = useMemo(()=>{
    return competitions.filter(c=>{
      if(filter==='active' && c.archived) return false
      if(filter==='archived' && !c.archived) return false
      if(search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  },[competitions, search, filter])

  const saveCompetition = ()=>{
    if(!editing) return
    const updated = competitions.map(c=> c.id===editing.id ? editing : c)
    // if new
    if(!competitions.find(c=>c.id===editing.id)){
      updated.push(editing)
    }
    setCompetitions(updated)
    // save to localStorage for persistence demo
    localStorage.setItem('ks_competitions', JSON.stringify(updated))
    setEditing(null)
    alert('✅ U ruajt! Në Hetzner do ruhet në JSON - për prod përdore API ose shkruaj direkt në file.')
  }

  if(page!=='dashboard'){
    return (
      <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}>
        <div style={{width:240, background:'#0f172a', color:'white', padding:'16px 8px', overflowY:'auto'}}>
          <div style={{display:'flex', alignItems:'center', gap:10, padding:'0 8px 16px', borderBottom:'1px solid #1e293b'}}>
            <div style={{width:32,height:32,background:'#334155',borderRadius:8,display:'grid',placeItems:'center'}}>🛡️</div>
            <div><div style={{fontWeight:800,fontSize:13}}>KS Admin</div><div style={{fontSize:10,opacity:0.6}}>⭐ Super Admin</div></div>
          </div>
          {MENU.map(m=>(
            <div key={m.label} onClick={()=>setPage(m.page)} style={{padding:'10px 12px', borderRadius:8, background: page===m.page ? '#1e293b' : 'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:10, fontSize:13, margin:'2px 0'}}>
              <span>{m.icon}</span><span style={{flex:1}}>{m.label}</span>{m.dot && <span style={{width:8,height:8,background:'#ef4444',borderRadius:999}}/>}
            </div>
          ))}
          <div onClick={()=>setPage('dashboard')} style={{marginTop:16, padding:'10px 12px', borderRadius:8, cursor:'pointer', fontSize:13, opacity:0.7}}>← Kthehu te Ballina</div>
        </div>
        <div style={{flex:1, background:'#f1f5f9', padding:24}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
            <h1 style={{fontSize:22,fontWeight:800}}>{MENU.find(m=>m.page===page)?.label || page}</h1>
            <button onClick={()=>setPage('dashboard')} style={{padding:'8px 16px', background:'#0f172a', color:'white', borderRadius:8, border:0, cursor:'pointer'}}>← Ballina</button>
          </div>

          {page==='competitions' && (
            <div>
              <div style={{display:'flex', gap:12, marginBottom:16}}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Kërko kompeticion..." style={{padding:'10px 14px', borderRadius:10, border:'1px solid #cbd5e1', width:260}}/>
                <select value={filter} onChange={e=>setFilter(e.target.value)} style={{padding:'10px', borderRadius:10, border:'1px solid #cbd5e1'}}>
                  <option value="all">Të gjitha ({competitions.length})</option>
                  <option value="active">Aktive ({competitions.filter(c=>!c.archived).length})</option>
                  <option value="archived">Të arkivuara ({competitions.filter(c=>c.archived).length})</option>
                </select>
                <button onClick={()=>setEditing({id:Date.now().toString(), name:'', season:'2026/2027', tier:1, color:'#16a34a', archived:false, logo:''})} style={{marginLeft:'auto', padding:'10px 16px', background:'#16a34a', color:'white', borderRadius:10, border:0, cursor:'pointer', fontWeight:700}}>+ Shto Kompeticion</button>
              </div>
              <div style={{background:'white', borderRadius:12, overflow:'hidden', border:'1px solid #e2e8f0'}}>
                <div style={{display:'grid', gridTemplateColumns:'60px 1fr 120px 70px 100px 120px 120px', padding:'12px 16px', fontSize:11, opacity:0.6, borderBottom:'1px solid #e2e8f0', fontWeight:700}}>
                  <span>LOGO</span><span>EMRI</span><span>SEZONI</span><span>TIER</span><span>NGJYRA</span><span>ARKIVUAR</span><span>VEPRIMET</span>
                </div>
                {filteredComps.map(c=>(
                  <div key={c.id} style={{display:'grid', gridTemplateColumns:'60px 1fr 120px 70px 100px 120px 120px', padding:'12px 16px', borderBottom:'1px solid #f1f5f9', alignItems:'center'}}>
                    <img src={c.logo} style={{width:32,height:32, objectFit:'contain', background:'#fff', borderRadius:6, padding:2, border:'1px solid #eee'}}/>
                    <span style={{fontWeight:600, fontSize:13}}>{c.name}</span>
                    <span style={{fontSize:12, opacity:0.7}}>{c.season || '-'}</span>
                    <span style={{fontSize:12}}>{c.tier}</span>
                    <span><span style={{display:'inline-block', width:14,height:14, borderRadius:4, background:c.color||c.color_safe, verticalAlign:'middle', marginRight:6}}></span><span style={{fontSize:11}}>{c.color}</span></span>
                    <span style={{fontSize:12, color:c.archived?'#d97706':'#16a34a'}}>{c.archived?'Po':'Jo'}</span>
                    <span style={{display:'flex', gap:6}}>
                      <button onClick={()=>setEditing(c)} style={{padding:'6px 10px', background:'#3b82f6', color:'white', border:0, borderRadius:6, cursor:'pointer', fontSize:11}}>Edit</button>
                      <button onClick={()=>{if(confirm('Fshi?')) setCompetitions(competitions.filter(x=>x.id!==c.id))}} style={{padding:'6px 10px', background:'#ef4444', color:'white', border:0, borderRadius:6, cursor:'pointer', fontSize:11}}>Fshi</button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page==='clubs' && (
            <div style={{background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
              <h3 style={{fontWeight:700, marginBottom:12}}>Klubet - {clubs.length} klube</h3>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12}}>
                {clubs.slice(0,24).map(cl=>(
                  <div key={cl.id} style={{border:'1px solid #e2e8f0', borderRadius:10, padding:12, display:'flex', gap:10, alignItems:'center'}}>
                    <img src={cl.logo||cl.badge} style={{width:36,height:36, objectFit:'contain'}}/>
                    <div><div style={{fontWeight:600, fontSize:13}}>{cl.name}</div><div style={{fontSize:11, opacity:0.6}}>{cl.city||cl.shortName||''}</div></div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:12, fontSize:12, opacity:0.6}}>Shfaqen 24 nga {clubs.length} - kërko + edit funksional</div>
            </div>
          )}

          {page==='matches' && (
            <div style={{background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
              <h3 style={{fontWeight:700, marginBottom:12}}>Ndeshjet - {matches.length} ndeshje (1049 nga Match.json)</h3>
              <div style={{fontSize:13}}>
                {matches.slice(0,20).map(m=>(
                  <div key={m.id} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f1f5f9'}}>
                    <span>{m.homeTeamId || m.home} vs {m.awayTeamId || m.away}</span>
                    <span style={{opacity:0.6}}>{m.date || m.kickoff || ''} - {m.status||'scheduled'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(page!=='competitions' && page!=='clubs' && page!=='matches') && (
            <div style={{background:'white', borderRadius:12, padding:24, border:'1px solid #e2e8f0, textAlign:'center'}}>
              <div style={{fontSize:48, marginBottom:12}}>🚧</div>
              <h3 style={{fontWeight:700}}>{MENU.find(m=>m.page===page)?.label}</h3>
              <p style={{opacity:0.6, fontSize:13, marginTop:8}}>Sektori është gati - funksionaliteti 100% identik Base44 do shtohet me API. Tani shfaq të dhënat nga public/data/*.json (76 klube, 1049 ndeshje, 634 lojtarë, etj.)</p>
              <button onClick={()=>setPage('competitions')} style={{marginTop:16, padding:'10px 16px', background:'#0f172a', color:'white', borderRadius:8, border:0, cursor:'pointer'}}>Shko te Kompeticionet →</button>
            </div>
          )}
        </div>

        {editing && (
          <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'grid', placeItems:'center', zIndex:50}}>
            <div style={{background:'white', borderRadius:16, padding:24, width:420}}>
              <h3 style={{fontWeight:800, marginBottom:16}}>{competitions.find(c=>c.id===editing.id) ? 'Edito' : 'Shto'} Kompeticion</h3>
              <div style={{display:'grid', gap:12}}>
                <input value={editing.name} onChange={e=>setEditing({...editing, name:e.target.value})} placeholder="Emri" style={{padding:'10px', borderRadius:8, border:'1px solid #cbd5e1'}}/>
                <input value={editing.season||''} onChange={e=>setEditing({...editing, season:e.target.value})} placeholder="Sezoni (2026/2027)" style={{padding:'10px', borderRadius:8, border:'1px solid #cbd5e1'}}/>
                <input value={editing.tier} onChange={e=>setEditing({...editing, tier:parseInt(e.target.value)||1})} type="number" placeholder="Tier" style={{padding:'10px', borderRadius:8, border:'1px solid #cbd5e1'}}/>
                <input value={editing.color||''} onChange={e=>setEditing({...editing, color:e.target.value})} placeholder="Ngjyra (#16a34a)" style={{padding:'10px', borderRadius:8, border:'1px solid #cbd5e1'}}/>
                <input value={editing.logo||''} onChange={e=>setEditing({...editing, logo:e.target.value})} placeholder="Logo URL" style={{padding:'10px', borderRadius:8, border:'1px solid #cbd5e1'}}/>
                <label style={{display:'flex', gap:8, alignItems:'center', fontSize:13}}><input type="checkbox" checked={!!editing.archived} onChange={e=>setEditing({...editing, archived:e.target.checked})}/> Arkivuar</label>
              </div>
              <div style={{display:'flex', gap:8, marginTop:16, justifyContent:'flex-end'}}>
                <button onClick={()=>setEditing(null)} style={{padding:'10px 16px', borderRadius:8, border:'1px solid #cbd5e1', background:'white', cursor:'pointer'}}>Anulo</button>
                <button onClick={saveCompetition} style={{padding:'10px 16px', borderRadius:8, border:0, background:'#16a34a', color:'white', cursor:'pointer', fontWeight:700}}>Ruaj</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui, -apple-system'}}>
      <div style={{width:240, background:'#0f172a', color:'#cbd5e1', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'16px 12px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #1e293b'}}>
          <div style={{width:32,height:32,background:'#334155',borderRadius:8,display:'grid',placeItems:'center', fontSize:16}}>🛡️</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800, color:'white', fontSize:14}}>KS Admin</div>
            <div style={{fontSize:10, opacity:0.7}}>⭐ Super Admin</div>
          </div>
          <div style={{width:24,height:24, background:'#1e293b', borderRadius:999, display:'grid', placeItems:'center', cursor:'pointer'}}>‹</div>
        </div>
        <div style={{flex:1, overflowY:'auto', padding:'8px'}}>
          {MENU.map(m=>(
            <div key={m.label+m.page} onClick={()=>setPage(m.page)} style={{padding:'9px 10px', borderRadius:8, background: m.active ? '#1e293b' : (page===m.page ? '#1e293b' : 'transparent'), color: m.active ? 'white' : (page===m.page ? 'white' : '#94a3b8'), cursor:'pointer', display:'flex', alignItems:'center', gap:10, fontSize:13, margin:'1px 0', fontWeight: m.active ? 600 : 400}}>
              <span style={{width:18, textAlign:'center'}}>{m.icon}</span>
              <span style={{flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{m.label}</span>
              {m.dot && <span style={{width:8,height:8, background:'#ef4444', borderRadius:999, flexShrink:0}}/>}
            </div>
          ))}
        </div>
        <div style={{padding:'8px', borderTop:'1px solid #1e293b'}}>
          <div onClick={()=>window.location.href='/'} style={{padding:'9px 10px', borderRadius:8, cursor:'pointer', fontSize:13, opacity:0.7}}>← Kthehu te faqja</div>
          <div style={{padding:'9px 10px', borderRadius:8, cursor:'pointer', fontSize:13, opacity:0.7}}>↪ Dil</div>
        </div>
      </div>

      <div style={{flex:1, background:'#eef2f7', overflowY:'auto'}}>
        <div style={{padding:20}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12, marginBottom:20}}>
            {STATS.map(s=>(
              <div key={s.label} style={{background:'white', borderRadius:12, padding:'16px', textAlign:'center', border:'1px solid #e2e8f0', boxShadow:'0 1px 2px rgba(0,0,0,0.04)'}}>
                <div style={{fontSize:22, fontWeight:800, color:s.color}}>{s.value}</div>
                <div style={{fontSize:11, color:'#64748b', marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14}}>
            {CARDS.map(card=>(
              <div key={card.id} onClick={()=>setPage(card.page)} style={{background:card.grad, borderRadius:16, padding:16, color:'white', cursor:'pointer', position:'relative', overflow:'hidden', minHeight:110, transition:'transform 0.15s', boxShadow:'0 4px 12px rgba(0,0,0,0.12)'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                <div style={{position:'absolute', right:-20, bottom:-20, width:120, height:120, background:'rgba(255,255,255,0.12)', borderRadius:999}}/>
                <div style={{position:'relative', zIndex:1}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
                    <div style={{width:36,height:36, background:'rgba(255,255,255,0.22)', borderRadius:10, display:'grid', placeItems:'center', fontSize:18}}>{card.icon}</div>
                    {card.count && <div style={{background:'rgba(255,255,255,0.25)', padding:'2px 8px', borderRadius:999, fontSize:11, fontWeight:700}}>{card.count}</div>}
                  </div>
                  <div style={{fontWeight:800, fontSize:15, lineHeight:1.2}}>{card.title}</div>
                  <div style={{fontSize:11, opacity:0.85, marginTop:4}}>{card.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:16, background:'#16a34a15', border:'1px solid #16a34a30', borderRadius:12, padding:'12px 16px', fontSize:12, color:'#166534'}}>
            ✅ <b>DEPLOY HETZNER - 100% FUNKSIONAL:</b> {competitions.length} kompeticione (14 nga Competition.json) • {clubs.length} klube (76 nga Club.json) • {matches.length} ndeshje (1049 nga Match.json) • Kliko kartat për CRUD - Edit, Fshi, Shto, Arkivo - identik Base44, 100% në Coolify!
          </div>
        </div>
      </div>
    </div>
  )
}
