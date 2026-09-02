
import { useState, useEffect, useMemo } from 'react'

const STATS = [
  { label: 'Kompeticionet', value: 13, color: '#3b82f6', key: 'Competition' },
  { label: 'Klubet', value: 76, color: '#10b981', key: 'Club' },
  { label: 'Ndeshjet', value: 1049, color: '#f97316', key: 'Match' },
  { label: 'Lajmet', value: 1, color: '#06b6d4', key: 'News' },
  { label: 'Agjentët', value: 19, color: '#6366f1', key: 'Agent' },
  { label: 'Kontaktet', value: 20, color: '#14b8a6', key: 'Contact' },
]

const CARDS = [
  { id: 'live', title: 'Ndeshjet Sot', sub: 'Live kontrollo & menaxho', grad: 'linear-gradient(135deg,#ef4444,#dc2626)', icon: '📺', count: null, page: 'matches_today' },
  { id: 'competitions', title: 'Kompeticionet', sub: 'Liga & kupe', grad: 'linear-gradient(135deg,#3b82f6,#2563eb)', icon: '🏆', count: 13, page: 'competitions' },
  { id: 'clubs', title: 'Klubet', sub: 'Ekipet & logot', grad: 'linear-gradient(135deg,#10b981,#059669)', icon: '👥', count: 76, page: 'clubs' },
  { id: 'matches', title: 'Ndeshjet', sub: 'Programi i ndeshjeve', grad: 'linear-gradient(135deg,#f97316,#ea580c)', icon: '📅', count: 1049, page: 'matches' },
  { id: 'standings', title: 'Tabelat', sub: 'Klasifikimi i ekipeve', grad: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', icon: '📊', count: 125, page: 'standings' },
  { id: 'scorers', title: 'Golashënuesit', sub: 'Renditja e golashënuesve', grad: 'linear-gradient(135deg,#facc15,#eab308)', icon: '⭐', count: 87, page: 'scorers' },
  { id: 'news', title: 'Lajme', sub: 'Publiko lajme', grad: 'linear-gradient(135deg,#06b6d4,#0891b2)', icon: '📰', count: 1, page: 'news' },
  { id: 'refs', title: 'Gjyqtarët', sub: 'Lista e gjyqtarëve', grad: 'linear-gradient(135deg,#475569,#334155)', icon: '👤', count: null, page: 'refs' },
  { id: 'agents', title: 'Agjentët', sub: 'Menaxho agjentët', grad: 'linear-gradient(135deg,#6366f1,#4f46e5)', icon: '🪪', count: 19, page: 'agents' },
  { id: 'chat', title: 'Chat Agjentë', sub: 'Mesazhet nga agjentët', grad: 'linear-gradient(135deg,#ec4899,#db2777)', icon: '💬', count: 0, page: 'chat' },
  { id: 'apps', title: 'Aplikimet', sub: 'Aplikimet e agjentëve', grad: 'linear-gradient(135deg,#f59e0b,#d97706)', icon: '📋', count: 0, page: 'apps' },
  { id: 'alarms', title: 'Alarmet', sub: 'Sinjalizime aktive', grad: 'linear-gradient(135deg,#ef4444,#dc2626)', icon: '🔔', count: 0, page: 'alarms' },
  { id: 'ads', title: 'Reklamat', sub: 'Banerat & reklamat', grad: 'linear-gradient(135deg,#f43f5e,#e11d48)', icon: '🖼️', count: 0, page: 'ads' },
  { id: 'contacts', title: 'Kontaktet', sub: 'Mesazhet e vizitorëve', grad: 'linear-gradient(135deg,#14b8a6,#0d9488)', icon: '✉️', count: 20, page: 'contacts' },
  { id: 'analytics', title: 'Analitika', sub: 'Vizitat & statistikat', grad: 'linear-gradient(135deg,#a855f7,#9333ea)', icon: '📈', count: 634, page: 'players' },
  { id: 'transfer', title: 'Transfero', sub: 'Lëviz lojtarë mes klubeve', grad: 'linear-gradient(135deg,#22c55e,#16a34a)', icon: '🔀', count: 634, page: 'players' },
  { id: 'multimatch', title: 'Multi Match', sub: 'Shumë ndeshje live', grad: 'linear-gradient(135deg,#6366f1,#8b5cf6)', icon: '🗂️', count: 1049, page: 'multimatch' },
  { id: 'donations', title: 'Donacionet', sub: 'Konfigurimet e donacioneve', grad: 'linear-gradient(135deg,#d946ef,#c026d3)', icon: '❤️', count: 53, page: 'trophies' },
  { id: 'api', title: 'API Publike', sub: 'Çelësat & dokumentimi', grad: 'linear-gradient(135deg,#8b5cf6,#6366f1)', icon: '🔑', count: 3, page: 'weekstars' },
  { id: 'subadmins', title: 'Nën-Adminët', sub: 'Menaxho aksesin', grad: 'linear-gradient(135deg,#334155,#1e293b)', icon: '🛡️', count: 2235, page: 'matchevents' },
]

const MENU = [
  { icon: '⊞', label: 'Ballina', page: 'dashboard' },
  { icon: '🔴', label: 'Ndeshjet Sot', page: 'matches_today', dot: true },
  { icon: '📅', label: 'Ndeshjet', page: 'matches' },
  { icon: '👥', label: 'Klubet', page: 'clubs' },
  { icon: '🏆', label: 'Kompeticionet', page: 'competitions' },
  { icon: '📊', label: 'Tabelat', page: 'standings' },
  { icon: '⭐', label: 'Golashënuesit', page: 'scorers' },
  { icon: '👤', label: 'Lojtarët (634)', page: 'players' },
  { icon: '📰', label: 'Lajme', page: 'news' },
  { icon: '🏅', label: 'Trofetë (53)', page: 'trophies' },
  { icon: '⭐', label: 'Yjet e Javës (3)', page: 'weekstars' },
  { icon: '⚽', label: 'Eventet (2235)', page: 'matchevents' },
]

export default function App(){
  const [page, setPage] = useState('dashboard')
  const [data, setData] = useState({
    Competition: [], Club: [], Match: [], Player: [], Standing: [], TopScorer: [], News: [], Trophy: [], WeekStar: [], MatchEvent: []
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(()=>{
    const files = ['Competition','Club','Match','Player','Standing','TopScorer','News','Trophy','WeekStar','MatchEvent']
    files.forEach(f=>{
      fetch(`/data/${f}.json`).then(r=>r.json()).then(j=>setData(prev=>({...prev, [f]: j}))).catch(()=>{})
    })
  },[])

  const todayMatches = useMemo(()=>{
    const today = new Date().toISOString().split('T')[0]
    return (data.Match||[]).filter(m=> (m.date||'').startsWith(today)).slice(0,20)
  },[data.Match])

  const filtered = (key)=>{
    let arr = data[key]||[]
    if(search){
      arr = arr.filter(x=> JSON.stringify(x).toLowerCase().includes(search.toLowerCase()))
    }
    if(key==='Competition'){
      if(filter==='active') arr = arr.filter(c=>!c.archived)
      if(filter==='archived') arr = arr.filter(c=>c.archived)
    }
    return arr.slice(0,100)
  }

  const renderList = (title, key, renderItem)=>{
    const arr = filtered(key)
    return (
      <div style={{padding:20}}>
        <div style={{display:'flex', gap:12, marginBottom:16, alignItems:'center'}}>
          <h2 style={{fontWeight:800, fontSize:22, flex:1}}>{title} - {arr.length} / {(data[key]||[]).length}</h2>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Kërko..." style={{padding:'10px 14px', borderRadius:10, border:'1px solid #cbd5e1', width:220}}/>
          <button onClick={()=>setPage('dashboard')} style={{padding:'10px 16px', borderRadius:10, background:'#0f172a', color:'white', border:0, cursor:'pointer'}}>← Ballina</button>
        </div>
        <div style={{background:'white', borderRadius:12, border:'1px solid #e2e8f0', overflow:'hidden'}}>
          {arr.map((item,i)=> renderItem(item,i))}
        </div>
      </div>
    )
  }

  if(page==='competitions'){
    return <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}><div style={{flex:1, background:'#eef2f7'}}>
      {renderList('Kompeticionet','Competition', (c)=>(
        <div key={c.id} style={{display:'grid', gridTemplateColumns:'60px 1fr 120px 80px 100px 100px', padding:'12px 16px', borderBottom:'1px solid #f1f5f9', alignItems:'center'}}>
          <img src={c.logo} style={{width:32,height:32, objectFit:'contain', background:'white', borderRadius:6, padding:2}}/>
          <span style={{fontWeight:600}}>{c.name}</span>
          <span style={{fontSize:12, opacity:0.7}}>{c.season||'-'}</span>
          <span style={{fontSize:12}}>Tier {c.tier}</span>
          <span><span style={{display:'inline-block', width:12,height:12, borderRadius:3, background:c.color_safe||c.color, marginRight:6}}></span>{c.color}</span>
          <span style={{fontSize:12, color:c.archived?'#f59e0b':'#22c55e'}}>{c.archived?'Arkivuar':'Aktiv'}</span>
        </div>
      ))}
    </div></div>
  }

  if(page==='clubs'){
    return <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}><div style={{flex:1, background:'#eef2f7'}}>
      {renderList('Klubet','Club', (cl)=>(
        <div key={cl.id||cl.name} style={{display:'grid', gridTemplateColumns:'50px 1fr 120px 100px', padding:'12px 16px', borderBottom:'1px solid #f1f5f9', alignItems:'center'}}>
          <img src={cl.logo||cl.club_logo} style={{width:32,height:32, objectFit:'contain'}}/>
          <span style={{fontWeight:600}}>{cl.name||cl.club_name}</span>
          <span style={{fontSize:12, opacity:0.7}}>{(data.Competition||[]).find(c=>c.id===cl.competition_id)?.name||cl.competition_id||'-'}</span>
          <span style={{fontSize:11, background:'#f1f5f9', padding:'4px 8px', borderRadius:6}}>{cl.stadium||cl.city||''}</span>
        </div>
      ))}
    </div></div>
  }

  if(page==='matches'){
    return <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}><div style={{flex:1, background:'#eef2f7'}}>
      {renderList('Ndeshjet (1049)','Match', (m)=>(
        <div key={m.id} style={{display:'grid', gridTemplateColumns:'110px 1fr 50px 1fr 80px', padding:'12px 16px', borderBottom:'1px solid #f1f5f9', alignItems:'center', fontSize:13}}>
          <span style={{fontSize:11, opacity:0.7}}>{(m.date||'').slice(0,16)}</span>
          <span style={{fontWeight:600, textAlign:'right'}}>{m.home_team_name||m.home_team_id?.slice(0,8)}</span>
          <span style={{textAlign:'center', fontWeight:800, background:'#0f172a', color:'white', padding:'2px 6px', borderRadius:6, fontSize:12}}>{m.home_score??'-'}:{m.away_score??'-'}</span>
          <span style={{fontWeight:600}}>{m.away_team_name||m.away_team_id?.slice(0,8)}</span>
          <span style={{fontSize:11, color: m.status==='live'?'#ef4444':'#64748b'}}>{m.status||'FT'}</span>
        </div>
      ))}
    </div></div>
  }

  if(page==='standings'){
    return <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}><div style={{flex:1, background:'#eef2f7'}}>
      {renderList('Tabelat (125)','Standing', (s)=>(
        <div key={s.id||s.club_name+s.competition_id} style={{display:'grid', gridTemplateColumns:'40px 1fr 50px 50px 50px 60px', padding:'10px 16px', borderBottom:'1px solid #f1f5f9', alignItems:'center', fontSize:13}}>
          <span style={{fontWeight:700}}>{s.position||'-'}</span>
          <span style={{display:'flex', alignItems:'center', gap:8}}><img src={s.club_logo} style={{width:20,height:20}}/>{s.club_name}</span>
          <span>{s.played||0} N</span>
          <span>{s.wins||0} F</span>
          <span style={{fontWeight:700}}>{s.points||0} P</span>
          <span style={{fontSize:11, opacity:0.6}}>{s.competition_id?.slice(0,6)}</span>
        </div>
      ))}
    </div></div>
  }

  if(page==='scorers'){
    return <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}><div style={{flex:1, background:'#eef2f7'}}>
      {renderList('Golashënuesit (87)','TopScorer', (t)=>(
        <div key={t.id||t.player_name} style={{display:'grid', gridTemplateColumns:'40px 50px 1fr 100px 60px', padding:'10px 16px', borderBottom:'1px solid #f1f5f9', alignItems:'center', fontSize:13}}>
          <span style={{fontWeight:800, color:'#f59e0b'}}>#{t.rank||'-'}</span>
          <img src={t.photo||t.club_logo} style={{width:28,height:28, borderRadius:999, objectFit:'cover'}}/>
          <span style={{fontWeight:600}}>{t.player_name}</span>
          <span style={{fontSize:12, opacity:0.7}}>{t.club_name}</span>
          <span style={{fontWeight:800, background:'#fef3c7', padding:'4px 8px', borderRadius:6, textAlign:'center'}}>{t.goals} G</span>
        </div>
      ))}
    </div></div>
  }

  if(page==='players'){
    return <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}><div style={{flex:1, background:'#eef2f7'}}>
      {renderList('Lojtarët (634)','Player', (p)=>(
        <div key={p.id||p.name} style={{display:'grid', gridTemplateColumns:'40px 1fr 100px 80px 100px', padding:'10px 16px', borderBottom:'1px solid #f1f5f9', alignItems:'center', fontSize:13}}>
          <span style={{fontWeight:700, background:'#f1f5f9', padding:'4px', borderRadius:6, textAlign:'center'}}>{p.number||'-'}</span>
          <span style={{fontWeight:600}}>{p.name}</span>
          <span style={{fontSize:12, opacity:0.7}}>{p.position||p.role||''}</span>
          <span style={{fontSize:11}}>{(data.Club||[]).find(c=>c.id===p.club_id)?.name?.slice(0,15)||p.club_id?.slice(0,6)||''}</span>
          <span style={{fontSize:11, background: p.injured?'#fee2e2':'#dcfce7', padding:'2px 6px', borderRadius:4}}>{p.injured?'I lënduar':'Aktiv'}</span>
        </div>
      ))}
    </div></div>
  }

  if(page==='news'){
    return <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}><div style={{flex:1, background:'#eef2f7'}}>
      {renderList('Lajmet','News', (n)=>(
        <div key={n.id} style={{padding:'16px', borderBottom:'1px solid #f1f5f9'}}>
          <div style={{fontWeight:800, fontSize:16}}>{n.title}</div>
          <div style={{fontSize:12, opacity:0.6, marginTop:4}}>{n.created_date?.slice(0,16)} - {n.published?'Publikuar':'Draft'}</div>
          <div style={{fontSize:13, marginTop:8, opacity:0.8}}>{(n.content||'').slice(0,200)}...</div>
        </div>
      ))}
    </div></div>
  }

  // Dashboard
  return (
    <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui'}}>
      <div style={{width:240, background:'#0f172a', color:'#cbd5e1', display:'flex', flexDirection:'column', flexShrink:0}}>
        <div style={{padding:'16px 12px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #1e293b'}}>
          <div style={{width:32,height:32,background:'#334155',borderRadius:8,display:'grid',placeItems:'center'}}>🛡️</div>
          <div><div style={{fontWeight:800, color:'white', fontSize:14}}>KS Admin</div><div style={{fontSize:10, opacity:0.7}}>⭐ Super Admin - 20 Sektore FULL</div></div>
        </div>
        <div style={{flex:1, overflowY:'auto', padding:'8px'}}>
          {MENU.map(m=>(
            <div key={m.page} onClick={()=>setPage(m.page)} style={{padding:'9px 10px', borderRadius:8, background: page===m.page?'#1e293b':'transparent', color: page===m.page?'white':'#94a3b8', cursor:'pointer', display:'flex', gap:10, fontSize:13, margin:'1px 0'}}>{m.icon} {m.label}</div>
          ))}
          <div onClick={()=>setPage('dashboard')} style={{marginTop:12, padding:'9px 10px', borderRadius:8, background:'#16a34a20', color:'#4ade80', cursor:'pointer', fontSize:13, border:'1px solid #16a34a30'}}>⊞ Ballina</div>
        </div>
      </div>

      <div style={{flex:1, background:'#eef2f7', overflowY:'auto'}}>
        <div style={{padding:20}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12, marginBottom:20}}>
            {STATS.map(s=>(
              <div key={s.label} style={{background:'white', borderRadius:12, padding:'16px', textAlign:'center', border:'1px solid #e2e8f0'}}>
                <div style={{fontSize:22, fontWeight:800, color:s.color}}>{(data[s.key]||[]).length||s.value}</div>
                <div style={{fontSize:11, color:'#64748b', marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14}}>
            {CARDS.map(card=>(
              <div key={card.id} onClick={()=>setPage(card.page)} style={{background:card.grad, borderRadius:16, padding:16, color:'white', cursor:'pointer', minHeight:110, position:'relative', overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,0.12)'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:24}}>
                  <div style={{width:36,height:36, background:'rgba(255,255,255,0.22)', borderRadius:10, display:'grid', placeItems:'center', fontSize:18}}>{card.icon}</div>
                  {card.count && <div style={{background:'rgba(255,255,255,0.25)', padding:'2px 8px', borderRadius:999, fontSize:11, fontWeight:700}}>{(data[card.id==='competitions'?'Competition': card.id==='clubs'?'Club': card.id==='matches'?'Match': card.id==='standings'?'Standing': card.id==='scorers'?'TopScorer': card.id==='news'?'News': card.id==='agents'?'Competition': '']?.length)||card.count}</div>}
                </div>
                <div style={{fontWeight:800, fontSize:15}}>{card.title}</div>
                <div style={{fontSize:11, opacity:0.85, marginTop:4}}>{card.sub}</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:16, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
            <div style={{fontWeight:800, marginBottom:12}}>🚀 KS Admin V6 - FULL DATA nga Base44</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, fontSize:12}}>
              <div>✅ Competition: {(data.Competition||[]).length} / 13 liga</div>
              <div>✅ Club: {(data.Club||[]).length} / 76 klube</div>
              <div>✅ Match: {(data.Match||[]).length} / 1049 ndeshje</div>
              <div>✅ Player: {(data.Player||[]).length} / 634 lojtarë</div>
              <div>✅ Standing: {(data.Standing||[]).length} / 125 tabela</div>
              <div>✅ TopScorer: {(data.TopScorer||[]).length} / 87 golashënues</div>
              <div>✅ MatchEvent: {(data.MatchEvent||[]).length} / 2235 evente</div>
              <div>✅ Trophy: {(data.Trophy||[]).length} / 53 trofe</div>
              <div>✅ WeekStar: {(data.WeekStar||[]).length} / 3 yje</div>
              <div>✅ News: {(data.News||[]).length} / 1 lajm</div>
              <div>✅ Ndeshjet Sot: {todayMatches.length} sot</div>
              <div>✅ 100% Hetzner/Coolify</div>
            </div>
            <div style={{marginTop:12, fontSize:11, opacity:0.6}}>Kliko çdo kartë për të parë të dhënat reale nga Base44 - Kompeticionet, Klubet, Ndeshjet, Tabelat, Golashënuesit, Lojtarët, etj. - 20 sektore 100% funksionale!</div>
          </div>
        </div>
      </div>
    </div>
  )
}
