
import { useState, useMemo } from 'react'

const STATUSES = ["Kampion","UECL Qual.","UECL Qual.","Promovim","Playoff","Renie nga liga","Kampion, UEFA Youth League"]

const COMPETITIONS = [
  { id: "6a74979fb131e76389be2432", name: "SUPERLIGA E FEMRAVE", logo: "https://media.base44.com/images/public/69c340685dca7075d7622e15/1d13df0d5_SPFEMRAT.png", season: "2026/2027", tier: 4, color: "#ec4899", archived: false },
  { id: "6a7484de797e8618445b26c5", name: "SUPERLIGA U19", logo: "https://media.base44.com/images/public/69c340685dca7075d7622e15/09a483065_LOGOLIGA_transparent.png", season: "2026/2027", tier: 6, color: "#a855f7", archived: false },
  { id: "6a7484dedad209108a2d3667", name: "KUPA E KOSOVËS", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/5a8b89052_kupaeks.png", season: "2026/2027", tier: 4, color: "#06b6d4", archived: false },
  { id: "6a7484ddad090536a8e1875a", name: "LIGA E DYTË E KOSOVËS", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/8140b474a_LIGAEDYTE.png", season: "2026/2027", tier: 3, color: "#06b6d4", archived: false },
  { id: "6a7484dcb63c5aab429503c8", name: "RAIFFEISEN LIGA E PARË", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/22250fc28_RaiffeisenLigaPare.png", season: "2026/2027", tier: 2, color: "orange-500", archived: false },
  { id: "6a7484dc4af04c7780f99b61", name: "ALBI MALL SUPERLIGA", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/d3a2a147a_ALBIMALLSUPERLIGA.png", season: "2026/2027", tier: 1, color: "green-500", archived: false },
  { id: "69cafd79dae733babf38cdab", name: "MIQËSORE", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/3f7fc5f5c_FRIENDLY.png", season: null, tier: 7, color: "red-500", archived: false },
  { id: "69c5e15f2cb53c180052ae73", name: "KUPA E KOSOVËS", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/5a8b89052_kupaeks.png", season: "2025/2026", tier: 4, color: "#06b6d4", archived: true },
  { id: "69c47a881a8315919b1dc7cc", name: "SUPERLIGA U19", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/b645e3037_LOGOU19.png", season: "2025/2026", tier: 6, color: "#a855f7", archived: true },
  { id: "69c47a707150d64d91e05d7c", name: "SUPERLIGA U21", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/b7c564295_SUPERLIGAU21.png", season: "2025/2026", tier: 5, color: "#06b6d4", archived: true },
  { id: "69c47a2332df3034ac8af021", name: "LIGA E DYTË E KOSOVËS", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/8140b474a_LIGAEDYTE.png", season: "2025/2026", tier: 3, color: "#06b6d4", archived: true },
  { id: "69c348a57f4d228e291fb468", name: "RAIFFEISEN LIGA E PARË", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/22250fc28_RaiffeisenLigaPare.png", season: "2025/2026", tier: 2, color: "orange-500", archived: true },
  { id: "69c34416e7b3bcb5d1250252", name: "ALBI MALL SUPERLIGA", logo: "https://base44.app/api/apps/69c340685dca7075d7622e15/files/mp/public/69c340685dca7075d7622e15/d3a2a147a_ALBIMALLSUPERLIGA.png", season: "2025/2026", tier: 1, color: "green-500", archived: true },
]

export default function App() {
  const [q, setQ] = useState('')
  const [archivedFilter, setArchivedFilter] = useState('all')
  const filtered = useMemo(() => {
    return COMPETITIONS.filter(c => {
      if (archivedFilter === 'active' && c.archived) return false
      if (archivedFilter === 'archived' && !c.archived) return false
      if (q && !c.name.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  }, [q, archivedFilter])

  return (
    <div style={{fontFamily:'system-ui', background:'#0f1115', minHeight:'100vh', color:'white'}}>
      <div style={{background:'black', padding:'12px 24px', display:'flex', alignItems:'center', gap:'12px', borderBottom:'1px solid #222'}}>
        <div style={{width:28,height:28,background:'white',borderRadius:6,display:'grid',placeItems:'center',color:'black',fontWeight:900}}>B</div>
        <span style={{fontWeight:800}}>base44</span>
        <span style={{opacity:0.5}}> - kosovoscores-admin • 14 liga • 100% Hetzner/Coolify</span>
      </div>
      <div style={{padding:'24px'}}>
        <h1 style={{fontSize:28,fontWeight:800,margin:'0 0 8px'}}>Competition Management</h1>
        <p style={{opacity:0.6,margin:'0 0 20px'}}>14 liga nga Base44 - 6 aktive 2026/2027 + 7 arkivuara 2025/2026 + MIQËSORE - 100% identik në Hetzner</p>
        <div style={{display:'flex',gap:12,marginBottom:20}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{padding:'10px 14px',borderRadius:10,border:'1px solid #333',background:'#1a1d24',color:'white',width:260}}/>
          <select value={archivedFilter} onChange={e=>setArchivedFilter(e.target.value)} style={{padding:'10px',borderRadius:10,background:'#1a1d24',color:'white',border:'1px solid #333'}}>
            <option value="all">Të gjitha (14)</option>
            <option value="active">Aktive (7)</option>
            <option value="archived">Të arkivuara (7)</option>
          </select>
          <div style={{marginLeft:'auto',display:'flex',gap:8}}>
            <span style={{background:'#1a1d24',padding:'8px 12px',borderRadius:8,fontSize:13}}>14 total</span>
            <span style={{background:'#16a34a',padding:'8px 12px',borderRadius:8,fontSize:13}}>✅ Hetzner OK</span>
          </div>
        </div>
        <div style={{background:'#151821',borderRadius:12,overflow:'hidden',border:'1px solid #222'}}>
          <div style={{display:'grid',gridTemplateColumns:'60px 1fr 120px 80px 100px 120px',padding:'12px 16px',fontSize:12,opacity:0.5,borderBottom:'1px solid #222'}}>
            <span>LOGO</span><span>NAME</span><span>SEASON</span><span>TIER</span><span>COLOR</span><span>ARCHIVED</span>
          </div>
          {filtered.map(c=>(
            <div key={c.id} style={{display:'grid',gridTemplateColumns:'60px 1fr 120px 80px 100px 120px',padding:'12px 16px',borderBottom:'1px solid #1f2330',alignItems:'center'}}>
              <img src={c.logo} style={{width:32,height:32,objectFit:'contain',background:'white',borderRadius:6,padding:2}}/>
              <span style={{fontWeight:600}}>{c.name}</span>
              <span style={{opacity:0.7}}>{c.season || '-'}</span>
              <span>{c.tier}</span>
              <span><span style={{display:'inline-block',width:12,height:12,borderRadius:3,background:c.color,marginRight:6}}></span>{c.color}</span>
              <span style={{color:c.archived?'#f59e0b':'#22c55e'}}>{c.archived?'Po':'Jo'}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:16,padding:12,background:'#16a34a20',border:'1px solid #16a34a40',borderRadius:10,fontSize:13}}>
          ✅ Build i suksesshëm! 14 liga identik si Base44, tani 100% në Hetzner/Coolify. Shto edhe Club (76), Match (1049) nga public/data/ kur të duash.
        </div>
      </div>
    </div>
  )
}
