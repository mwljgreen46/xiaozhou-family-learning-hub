"use client";

import { useEffect, useMemo, useState } from "react";

type View = "home" | "focus" | "insights" | "network" | "devices" | "family";

const Icon = ({ name }: { name: string }) => <span className={`ico ico-${name}`} aria-hidden="true" />;

const navItems: { id: View; label: string; icon: string }[] = [
  { id: "home", label: "今日", icon: "home" },
  { id: "focus", label: "专注", icon: "target" },
  { id: "insights", label: "洞察", icon: "chart" },
  { id: "network", label: "网络", icon: "network" },
  { id: "devices", label: "设备", icon: "devices" },
  { id: "family", label: "家庭", icon: "family" },
];

const weekData = [
  { d: "一", v: 38 },
  { d: "二", v: 62 },
  { d: "三", v: 48 },
  { d: "四", v: 78 },
  { d: "五", v: 70 },
  { d: "六", v: 92 },
  { d: "日", v: 83 },
];

function MiniTrend() {
  return (
    <div className="trend" aria-label="近七日专注趋势">
      {weekData.map((item, index) => (
        <div className="trend-day" key={item.d}>
          <div className="bar-track">
            <span className={index === 6 ? "bar today" : "bar"} style={{ height: `${item.v}%` }} />
          </div>
          <span>{item.d}</span>
        </div>
      ))}
    </div>
  );
}

function Gauge({ value = 86 }: { value?: number }) {
  return (
    <div className="gauge" style={{ "--score": value } as React.CSSProperties}>
      <div className="gauge-inner">
        <strong>{value}</strong>
        <span>专注分</span>
      </div>
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button className={`toggle ${on ? "on" : ""}`} onClick={onChange} aria-label={label} aria-pressed={on}>
      <span />
    </button>
  );
}

function HomeView({
  onStart,
  onScan,
  quietMode,
  setQuietMode,
  lamp,
  setLamp,
}: {
  onStart: () => void;
  onScan: () => void;
  quietMode: boolean;
  setQuietMode: (v: boolean) => void;
  lamp: boolean;
  setLamp: (v: boolean) => void;
}) {
  return (
    <>
      <section className="hero-grid">
        <div className="greeting">
          <div className="eyebrow"><span className="live-dot" /> 家庭学习空间运行良好</div>
          <h1>晚上好，林女士</h1>
          <p>小舟今天状态不错。现在开始数学练习，预计 35 分钟完成。</p>
          <div className="hero-actions">
            <button className="primary" onClick={onStart}><Icon name="play" /> 开始专注</button>
            <button className="secondary" onClick={onScan}><Icon name="scan" /> 扫描作业</button>
          </div>
        </div>
        <div className="hero-status-card">
          <div className="room-visual">
            <div className={`lamp-visual ${lamp ? "lit" : ""}`}>
              <span className="lamp-head" />
              <span className="lamp-arm" />
              <span className="lamp-base" />
              <span className="light-cone" />
            </div>
            <div className="desk-line" />
            <span className="book book-a" />
            <span className="book book-b" />
            <span className="sensor-pulse pulse-a" />
            <span className="sensor-pulse pulse-b" />
          </div>
          <div className="room-copy">
            <span className="status-pill">书房 · 环境舒适</span>
            <h3>学习灯已就绪</h3>
            <p>照度 486 lux · 坐姿良好</p>
          </div>
        </div>
      </section>

      <section className="metrics-row">
        <article className="metric-card score-card">
          <div className="metric-top"><span>今日学习状态</span><span className="up">↗ 6%</span></div>
          <div className="score-layout"><Gauge /><div><b>表现很棒</b><p>比上周同期更专注</p><span className="tag green">连续 6 天达标</span></div></div>
        </article>
        <article className="metric-card">
          <div className="metric-top"><span>有效学习</span><Icon name="clock" /></div>
          <strong className="big-number">1<span>时</span> 42<span>分</span></strong>
          <div className="progress-line"><i style={{ width: "72%" }} /></div>
          <p>今日目标 2 小时 · 还差 18 分钟</p>
        </article>
        <article className="metric-card">
          <div className="metric-top"><span>专注趋势</span><span className="caption">近 7 日</span></div>
          <MiniTrend />
        </article>
      </section>

      <section className="content-grid">
        <div className="main-column">
          <div className="section-head"><div><span className="section-kicker">SMART PLAN</span><h2>接下来</h2></div><button className="text-button">查看本周计划 <span>→</span></button></div>
          <article className="next-session card">
            <div className="time-block"><strong>19:30</strong><span>约 35 分钟</span></div>
            <div className="subject-mark math">数</div>
            <div className="session-copy"><span className="tag coral">下一项</span><h3>数学 · 分数应用题</h3><p>同步课堂进度，完成练习册 P38–40</p></div>
            <div className="session-actions"><button className="round-button" aria-label="稍后提醒"><Icon name="bell" /></button><button className="start-small" onClick={onStart}>开始 <span>→</span></button></div>
          </article>
          <div className="section-head activity-head"><div><span className="section-kicker">TODAY</span><h2>今日足迹</h2></div></div>
          <article className="timeline card">
            <div className="timeline-item done"><div className="timeline-icon"><Icon name="book" /></div><div><b>英语晨读</b><p>完成课文跟读 12 分钟，流利度 91%</p></div><time>07:18</time></div>
            <div className="timeline-item done"><div className="timeline-icon"><Icon name="write" /></div><div><b>语文作业</b><p>完成生字练习，AI 识别 2 处笔顺建议</p></div><time>18:12</time></div>
            <div className="timeline-item current"><div className="timeline-icon"><Icon name="rest" /></div><div><b>休息中</b><p>距离下一次专注还有 16 分钟</p></div><time>现在</time></div>
          </article>
        </div>

        <aside className="side-column">
          <div className="section-head compact"><div><span className="section-kicker">AI INSIGHT</span><h2>小舟洞察</h2></div><button className="icon-button" aria-label="更多">•••</button></div>
          <article className="insight-card card">
            <div className="ai-orb"><span>AI</span></div>
            <p className="quote">“小舟在晚饭后 30 分钟进入学习，专注效率最高。”</p>
            <div className="insight-rule" />
            <p className="insight-note"><Icon name="spark" /> 建议把数学练习固定在 19:30，系统会提前准备环境。</p>
            <button className="outline-wide" onClick={onStart}>采纳建议并创建计划</button>
          </article>

          <div className="section-head device-head"><div><span className="section-kicker">ROOM CONTROL</span><h2>书房设备</h2></div><button className="text-button">全部设备</button></div>
          <article className="device-list card">
            <div className="device-row"><div className="device-icon lamp"><Icon name="lamp" /></div><div><b>智能学习灯</b><p>{lamp ? "已开启 · 自适应护眼" : "已关闭"}</p></div><Toggle on={lamp} onChange={() => setLamp(!lamp)} label="切换学习灯" /></div>
            <div className="device-row"><div className="device-icon wifi"><Icon name="wifi" /></div><div><b>学习净网</b><p>{quietMode ? "娱乐应用已暂停" : "当前无限制"}</p></div><Toggle on={quietMode} onChange={() => setQuietMode(!quietMode)} label="切换学习净网" /></div>
            <div className="device-row"><div className="device-icon air"><Icon name="air" /></div><div><b>空气环境</b><p>24℃ · PM2.5 优</p></div><span className="status-text">舒适</span></div>
          </article>
        </aside>
      </section>
    </>
  );
}

function FocusView({ active, seconds, onToggle, quietMode }: { active: boolean; seconds: number; onToggle: () => void; quietMode: boolean }) {
  const total = 35 * 60;
  const remaining = Math.max(total - seconds, 0);
  const mins = Math.floor(remaining / 60).toString().padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");
  const progress = Math.min((seconds / total) * 100, 100);
  return (
    <section className="focus-view view-enter">
      <div className="focus-copy"><span className="eyebrow"><span className={active ? "live-dot" : "muted-dot"} /> {active ? "专注空间已启动" : "等待开始"}</span><h1>数学 · 分数应用题</h1><p>练习册 P38–40 · 预计 35 分钟</p></div>
      <div className="focus-stage card">
        <div className="timer-wrap" style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}>
          <div className="timer-inner"><span>{active ? "专注中" : seconds ? "已暂停" : "准备好了吗"}</span><strong>{mins}:{secs}</strong><small>目标 35:00</small></div>
        </div>
        <button className={active ? "pause-button" : "primary focus-button"} onClick={onToggle}><Icon name={active ? "pause" : "play"} /> {active ? "暂停一下" : seconds ? "继续专注" : "开始专注"}</button>
        <div className="focus-environment">
          <div><Icon name="lamp" /><span><b>学习灯</b><small>护眼模式 · 486 lux</small></span><em>已联动</em></div>
          <div><Icon name="wifi" /><span><b>学习净网</b><small>{quietMode ? "娱乐与短视频已暂停" : "建议开启净网"}</small></span><em className={quietMode ? "" : "warn"}>{quietMode ? "已联动" : "未开启"}</em></div>
          <div><Icon name="posture" /><span><b>坐姿守护</b><small>肩颈角度正常</small></span><em>良好</em></div>
        </div>
      </div>
      <p className="privacy-note"><Icon name="shield" /> 学习行为仅在家庭中枢本地分析，摄像画面不出家门</p>
    </section>
  );
}

function InsightsView({ onScan }: { onScan: () => void }) {
  return (
    <section className="insights-page view-enter">
      <div className="page-title"><div><span className="section-kicker">WEEKLY INSIGHTS</span><h1>成长洞察</h1><p>把数据变成家长可以理解、孩子愿意接受的建议。</p></div><button className="secondary" onClick={onScan}><Icon name="scan" /> 分析新作业</button></div>
      <div className="insights-layout">
        <article className="card weekly-report"><div className="report-head"><div><span>本周专注力</span><strong>稳步上升</strong></div><span className="tag green">较上周 +8%</span></div><div className="line-chart"><div className="grid-lines" /><svg viewBox="0 0 620 180" role="img" aria-label="本周专注力折线图"><path className="area" d="M0 148 C70 134 86 112 145 122 S242 94 292 102 S380 72 430 80 S530 38 620 32 L620 180 L0 180 Z"/><path className="line" d="M0 148 C70 134 86 112 145 122 S242 94 292 102 S380 72 430 80 S530 38 620 32"/></svg><div className="chart-labels"><span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>今天</span></div></div></article>
        <article className="card habit-radar"><div className="metric-top"><span>习惯雷达</span><span className="caption">过去 7 天</span></div><div className="radar"><div className="radar-ring r1"/><div className="radar-ring r2"/><div className="radar-shape"/><span className="radar-label top">按时开始</span><span className="radar-label right">坐姿</span><span className="radar-label bottom">独立完成</span><span className="radar-label left">专注</span></div></article>
        <article className="card observation"><div className="ai-orb small"><span>AI</span></div><h3>本周最值得鼓励</h3><p>小舟连续 4 天不需要提醒就坐到了书桌前。对这个年龄来说，“主动开始”比延长学习时长更珍贵。</p><div className="parent-script"><span>可以这样说</span><q>“我注意到你最近都会自己开始学习，这说明你越来越会安排自己了。”</q></div></article>
        <article className="card subject-list"><div className="metric-top"><span>学科投入</span><span className="caption">共 9.4 小时</span></div><div className="subject-row"><i className="dot math"/><b>数学</b><div><span style={{ width: "82%" }}/></div><em>3.2h</em></div><div className="subject-row"><i className="dot chinese"/><b>语文</b><div><span style={{ width: "67%" }}/></div><em>2.7h</em></div><div className="subject-row"><i className="dot english"/><b>英语</b><div><span style={{ width: "52%" }}/></div><em>2.1h</em></div><div className="subject-row"><i className="dot reading"/><b>阅读</b><div><span style={{ width: "35%" }}/></div><em>1.4h</em></div></article>
      </div>
    </section>
  );
}

function DevicesView({ lamp, setLamp, quietMode, setQuietMode }: { lamp: boolean; setLamp:(v:boolean)=>void; quietMode:boolean; setQuietMode:(v:boolean)=>void }) {
  const [speaker, setSpeaker] = useState(true);
  const [air, setAir] = useState(true);
  return (
    <section className="devices-page view-enter">
      <div className="page-title"><div><span className="section-kicker">HOME ORCHESTRATION</span><h1>空间与设备</h1><p>家庭中枢已连接 8 台设备，所有自动化运行正常。</p></div><button className="primary"><Icon name="plus" /> 添加设备</button></div>
      <div className="scene-card card"><div><span className="eyebrow"><span className="live-dot" /> 当前场景</span><h2>晚间学习</h2><p>灯光、网络、温度与提醒已自动协同。</p></div><div className="scene-flow"><span><Icon name="lamp" /> 486 lux</span><i>→</i><span><Icon name="wifi" /> 学习净网</span><i>→</i><span><Icon name="air" /> 24℃</span></div></div>
      <h2 className="room-title">书房 <span>4 台设备</span></h2>
      <div className="device-cards">
        {[
          { name:"智能学习灯", sub:lamp?"护眼模式 · 亮度 72%":"已关闭", icon:"lamp", on:lamp, set:setLamp, cls:"red" },
          { name:"家庭网关", sub:quietMode?"学习净网 · 运行中":"高速模式", icon:"wifi", on:quietMode, set:setQuietMode, cls:"navy" },
          { name:"语音音箱", sub:speaker?"专注白噪音 · 20%":"已关闭", icon:"speaker", on:speaker, set:setSpeaker, cls:"amber" },
          { name:"空气管家", sub:air?"24℃ · 湿度 53%":"已关闭", icon:"air", on:air, set:setAir, cls:"green" },
        ].map((d)=><article className={`device-tile card ${d.on?"active":""}`} key={d.name}><div className={`device-hero-icon ${d.cls}`}><Icon name={d.icon}/></div><Toggle on={d.on} onChange={()=>d.set(!d.on)} label={`切换${d.name}`}/><h3>{d.name}</h3><p>{d.sub}</p><button className="device-detail">设备设置 <span>→</span></button></article>)}
      </div>
      <div className="automation-head"><h2>自动化</h2><button className="text-button">管理规则</button></div>
      <div className="automation-grid"><article className="card automation"><span className="rule-icon">IF</span><div><b>坐到书桌前</b><p>亮灯 → 暂停娱乐网络 → 播报计划</p></div><span className="tag green">运行中</span></article><article className="card automation"><span className="rule-icon">AI</span><div><b>连续低头 15 分钟</b><p>柔光提醒 → 语音提示休息</p></div><span className="tag green">运行中</span></article></div>
    </section>
  );
}

type NetworkDevice = {
  id: string;
  name: string;
  owner: string;
  kind: "pad" | "phone" | "computer" | "tv";
  place: string;
  usage: string;
  duration: string;
  down: number;
  paused: boolean;
  limit: "不限速" | "10 Mbps" | "3 Mbps" | "仅学习";
  child: boolean;
};

const initialNetworkDevices: NetworkDevice[] = [
  { id:"xiaozhou-pad", name:"小舟的 iPad", owner:"林小舟", kind:"pad", place:"书房", usage:"学而思 · 作业帮", duration:"今日 1小时42分", down:12.8, paused:false, limit:"仅学习", child:true },
  { id:"xiaozhou-phone", name:"小舟的手机", owner:"林小舟", kind:"phone", place:"儿童房", usage:"微信 · 音乐", duration:"今日 38分钟", down:2.4, paused:false, limit:"3 Mbps", child:true },
  { id:"mom-phone", name:"林女士的手机", owner:"林女士", kind:"phone", place:"客厅", usage:"微信 · 小红书", duration:"今日 2小时16分", down:6.7, paused:false, limit:"不限速", child:false },
  { id:"dad-computer", name:"爸爸的电脑", owner:"周先生", kind:"computer", place:"书房", usage:"视频会议 · 网盘", duration:"在线 46分钟", down:18.6, paused:false, limit:"不限速", child:false },
  { id:"living-tv", name:"客厅电视", owner:"公共设备", kind:"tv", place:"客厅", usage:"待机", duration:"今日 1小时05分", down:0.1, paused:false, limit:"10 Mbps", child:false },
];

function NetworkView({ quietMode, setQuietMode, notify }: { quietMode:boolean; setQuietMode:(v:boolean)=>void; notify:(v:string)=>void }) {
  const [devices, setDevices] = useState(initialNetworkDevices);
  const [selectedId, setSelectedId] = useState("xiaozhou-pad");
  const [filter, setFilter] = useState<"all"|"child">("all");
  const [schedule, setSchedule] = useState(true);
  const [entertainment, setEntertainment] = useState(true);
  const selected = devices.find(d=>d.id===selectedId) ?? devices[0];
  const shownDevices = filter === "child" ? devices.filter(d=>d.child) : devices;
  const activeDevices = devices.filter(d=>!d.paused).length;
  const totalDown = devices.reduce((sum,d)=>sum+(d.paused?0:d.down),0).toFixed(1);
  const updateDevice = (id:string, patch:Partial<NetworkDevice>) => setDevices(list=>list.map(d=>d.id===id?{...d,...patch}:d));
  const pauseSelected = () => {
    const next = !selected.paused;
    updateDevice(selected.id,{paused:next});
    notify(`${selected.name}${next?"已暂停上网":"已恢复上网"}`);
  };
  const setLimit = (limit:NetworkDevice["limit"]) => {
    updateDevice(selected.id,{limit,paused:false});
    notify(`${selected.name}已设置为${limit}`);
  };
  const applyStudyMode = () => {
    setQuietMode(true); setEntertainment(true); setSchedule(true);
    setDevices(list=>list.map(d=>d.child?{...d,limit:"仅学习",paused:false}:d));
    notify("儿童设备已切换为学习网络");
  };

  return (
    <section className="network-page view-enter">
      <div className="page-title network-title"><div><span className="section-kicker">HOME NETWORK</span><h1>家庭网络</h1><p>看得懂每台设备的使用情况，需要时温和地管一管。</p></div><button className="primary" onClick={applyStudyMode}><Icon name="shield"/> 一键学习网络</button></div>

      <div className="network-overview">
        <article className="network-health card">
          <div className="network-health-copy"><span className="eyebrow"><span className="live-dot"/> 千兆家庭宽带 · 运行良好</span><h2>全屋网络很顺畅</h2><p>当前没有异常连接，儿童设备的学习策略正在生效。</p><div className="network-live"><div><span>当前下载</span><strong>{totalDown}<small> Mbps</small></strong></div><div><span>当前上传</span><strong>8.6<small> Mbps</small></strong></div><div><span>在线设备</span><strong>{activeDevices}<small> 台</small></strong></div></div></div>
          <div className="router-rings"><span className="router-ring ring-one"/><span className="router-ring ring-two"/><div className="router-box"><i/><b>AI 家庭网关</b><small>延迟 12ms</small></div></div>
        </article>
        <article className="card traffic-card"><div className="metric-top"><span>今日流量构成</span><span className="caption">共 18.6 GB</span></div><div className="traffic-ring"><div><strong>18.6</strong><span>GB</span></div></div><div className="traffic-legend"><span><i className="learn"/>学习 41%</span><span><i className="video"/>视频 28%</span><span><i className="social"/>社交 19%</span><span><i className="other"/>其他 12%</span></div></article>
      </div>

      <div className="network-workspace">
        <div className="network-list-column">
          <div className="network-section-head"><div><span className="section-kicker">CONNECTED DEVICES</span><h2>已连接设备 <em>{devices.length}</em></h2></div><div className="filter-tabs"><button className={filter==="all"?"active":""} onClick={()=>setFilter("all")}>全部</button><button className={filter==="child"?"active":""} onClick={()=>setFilter("child")}>儿童设备</button></div></div>
          <div className="network-device-list card">
            <div className="network-table-head"><span>设备</span><span>当前使用</span><span>实时网速</span><span>策略</span></div>
            {shownDevices.map(device=><button className={`network-device-row ${selected.id===device.id?"selected":""} ${device.paused?"paused":""}`} key={device.id} onClick={()=>setSelectedId(device.id)}>
              <div className="network-device-name"><span className={`device-kind ${device.kind}`}><Icon name={device.kind}/></span><div><b>{device.name}</b><small><i className={device.paused?"offline-dot":"online-dot"}/>{device.paused?"已暂停":`${device.place} · 5GHz`}</small></div></div>
              <div className="usage-cell"><b>{device.usage}</b><span>{device.duration}</span></div>
              <div className="speed-cell"><b>{device.paused?"—":device.down.toFixed(1)}</b><span>{device.paused?"无网络":"Mbps ↓"}</span></div>
              <div className="policy-cell"><span className={device.limit==="仅学习"?"study-policy":device.paused?"pause-policy":"normal-policy"}>{device.paused?"已暂停":device.limit}</span><i>›</i></div>
            </button>)}
          </div>
          <div className="network-insight card"><div className="ai-orb small"><span>AI</span></div><div><b>今天有一个值得留意的变化</b><p>小舟手机的娱乐使用比平日多 24 分钟，主要发生在 17:20–18:00。没有影响作业开始时间，建议先观察，不必立即干预。</p></div><button onClick={()=>{setSelectedId("xiaozhou-phone");notify("已定位到小舟的手机")}}>查看设备</button></div>
        </div>

        <aside className="network-control card">
          <div className="control-head"><div className={`device-kind large ${selected.kind}`}><Icon name={selected.kind}/></div><div><span>{selected.owner}</span><h2>{selected.name}</h2><p>{selected.place} · {selected.paused?"当前已断网":"连接稳定"}</p></div><span className={selected.paused?"control-state off":"control-state"}>{selected.paused?"已暂停":"在线"}</span></div>
          <div className="control-usage"><div><span>今日已使用</span><strong>{selected.duration.replace("今日 ","")}</strong></div><div><span>实时下载</span><strong>{selected.paused?"0":selected.down.toFixed(1)} Mbps</strong></div></div>
          <div className="control-block"><label>网速限制</label><div className="speed-options">{(["不限速","10 Mbps","3 Mbps","仅学习"] as NetworkDevice["limit"][]).map(option=><button key={option} className={selected.limit===option&&!selected.paused?"active":""} onClick={()=>setLimit(option)}>{option}</button>)}</div><p>“仅学习”只允许教育、阅读和必要通讯服务。</p></div>
          {selected.child&&<div className="control-block rules"><div><div><b>学习时段</b><p>周一至周五 19:00–21:00</p></div><Toggle on={schedule} onChange={()=>{setSchedule(!schedule);notify(`学习时段${!schedule?"已开启":"已关闭"}`)}} label="切换学习时段"/></div><div><div><b>限制娱乐应用</b><p>短视频、游戏与直播</p></div><Toggle on={entertainment} onChange={()=>{setEntertainment(!entertainment);setQuietMode(!entertainment);notify(`娱乐应用限制${!entertainment?"已开启":"已关闭"}`)}} label="限制娱乐应用"/></div></div>}
          <button className={selected.paused?"resume-network":"pause-network"} onClick={pauseSelected}><Icon name={selected.paused?"play":"pause"}/>{selected.paused?"恢复此设备上网":"暂停此设备上网"}</button>
          <p className="control-privacy"><Icon name="shield"/>只呈现应用类别与使用时长，不读取聊天、照片和具体浏览内容。</p>
        </aside>
      </div>
    </section>
  );
}

function FamilyView() {
  return (
    <section className="family-page view-enter">
      <div className="page-title"><div><span className="section-kicker">FAMILY COMPANION</span><h1>家庭陪伴</h1><p>不过度监控，用恰到好处的反馈陪孩子建立自主感。</p></div><button className="secondary"><Icon name="settings"/> 家庭设置</button></div>
      <div className="family-grid">
        <article className="profile-card card"><div className="avatar child">舟</div><span className="tag green">在线 · 书房</span><h2>林小舟</h2><p>四年级 · 10 岁</p><div className="profile-stats"><div><strong>6</strong><span>连续达标</span></div><div><strong>86</strong><span>今日专注分</span></div><div><strong>12</strong><span>本周星星</span></div></div><button className="outline-wide">查看成长档案</button></article>
        <article className="card family-goal"><span className="section-kicker">FAMILY GOAL</span><h2>本周家庭约定</h2><p>学习时间由小舟自己开始，爸爸妈妈只提醒一次。</p><div className="goal-progress"><span style={{width:"72%"}} /></div><div className="goal-copy"><b>5 / 7 天完成</b><span>还差 2 天获得家庭电影夜</span></div><div className="stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span className="empty">★</span><span className="empty">★</span></div></article>
        <article className="card family-members"><div className="metric-top"><span>家庭成员</span><button className="text-button">邀请成员</button></div><div className="member"><div className="avatar mom">林</div><div><b>林女士</b><p>管理员 · 妈妈</p></div><span>主账号</span></div><div className="member"><div className="avatar dad">周</div><div><b>周先生</b><p>家庭成员 · 爸爸</p></div><span>可查看</span></div><div className="member"><div className="avatar child small">舟</div><div><b>林小舟</b><p>儿童账号</p></div><span>受保护</span></div></article>
        <article className="card privacy-card"><Icon name="shield"/><div><h3>数据留在家里</h3><p>学习视频不上传云端，仅保留姿态与时长等结构化结果。家长随时可以关闭或删除。</p><button className="text-button">隐私中心 →</button></div></article>
      </div>
    </section>
  );
}

function ScanModal({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<"ready"|"scanning"|"result">("ready");
  useEffect(()=>{ if(stage === "scanning") { const t=setTimeout(()=>setStage("result"),1600); return ()=>clearTimeout(t); }},[stage]);
  return <div className="modal-backdrop" onMouseDown={(e)=>{if(e.currentTarget===e.target)onClose();}}><div className="scan-modal" role="dialog" aria-modal="true" aria-label="AI 作业分析"><button className="modal-close" onClick={onClose}>×</button>{stage==="ready"&&<><span className="section-kicker">AI HOMEWORK</span><h2>扫描一页作业</h2><p>演示模式会使用一份数学练习样例，在家庭中枢本地完成识别。</p><div className="paper-preview"><div className="paper-head"><span>数学练习 · 分数</span><em>姓名：林小舟</em></div><p>1. 一根绳子长 12 米，用去 <u>1/3</u>，还剩多少米？</p><div className="handwriting">12 × 1/3 = 4（米）<br/>答：还剩 4 米。</div><i className="scan-corners"/></div><button className="primary wide" onClick={()=>setStage("scanning")}><Icon name="scan"/> 开始识别</button></>}{stage==="scanning"&&<div className="scanning-state"><div className="scan-graphic"><span/></div><h2>正在本地分析</h2><p>识别题目、笔迹与解题步骤…</p></div>}{stage==="result"&&<><span className="tag green">分析完成 · 1.6 秒</span><h2>不是粗心，是概念没转过来</h2><p className="result-lead">小舟算出了“用去的长度”，但题目问的是“还剩多少”。计算过程正确，缺少最后一步。</p><div className="result-grid"><div><span>知识点</span><b>分数乘法应用</b></div><div><span>掌握度</span><b>78% · 待巩固</b></div><div><span>建议练习</span><b>同类变式 2 题</b></div><div><span>家长提示</span><b>先问“求的是什么”</b></div></div><div className="gentle-tip"><Icon name="spark"/><p><b>推荐反馈</b>“你算对了用去 4 米，已经完成一大半了。我们再看看题目最后问什么？”</p></div><button className="primary wide" onClick={onClose}>加入明日巩固计划</button></>}</div></div>;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [focusActive, setFocusActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [quietMode, setQuietMode] = useState(true);
  const [lamp, setLamp] = useState(true);
  const [scanOpen, setScanOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => { if (!focusActive) return; const timer = setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(timer); }, [focusActive]);
  useEffect(() => { if (!toast) return; const t=setTimeout(()=>setToast(""),2600); return ()=>clearTimeout(t); }, [toast]);
  const date = useMemo(()=>new Intl.DateTimeFormat("zh-CN",{month:"long",day:"numeric",weekday:"long"}).format(new Date()),[]);
  const startFocus=()=>{setView("focus");setFocusActive(true);setLamp(true);setQuietMode(true);setToast("晚间学习场景已启动");};

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={()=>setView("home")} aria-label="返回今日"><span className="brand-mark"><i/><i/><i/></span><span><b>小舟</b><em>家庭学习中枢</em></span></button>
        <nav>{navItems.map(item=><button key={item.id} className={view===item.id?"active":""} onClick={()=>setView(item.id)}><Icon name={item.icon}/><span>{item.label}</span>{item.id==="network"&&<i className="nav-badge">5</i>}{item.id==="devices"&&<i className="nav-badge">8</i>}</button>)}</nav>
        <div className="hub-status"><div className="hub-visual"><span className="hub-light"/></div><div><span><i/>家庭中枢在线</span><p>本地 AI 正常运行</p></div></div>
        <button className="user-card"><div className="avatar mom">林</div><div><b>林女士</b><span>家庭管理员</span></div><span className="chevron">›</span></button>
      </aside>
      <main>
        <header><div className="mobile-brand"><span className="brand-mark"><i/><i/><i/></span><b>小舟</b></div><div className="date-label">{date}</div><div className="header-actions"><button aria-label="消息通知" className="header-icon"><Icon name="bell"/><span className="notification-dot"/></button><button aria-label="隐私保护开启" className="privacy-chip"><Icon name="shield"/><span>本地隐私保护</span></button></div></header>
        <div className="page-content">
          {view==="home"&&<HomeView onStart={startFocus} onScan={()=>setScanOpen(true)} quietMode={quietMode} setQuietMode={setQuietMode} lamp={lamp} setLamp={setLamp}/>} 
          {view==="focus"&&<FocusView active={focusActive} seconds={seconds} onToggle={()=>{setFocusActive(v=>!v);setLamp(true);}} quietMode={quietMode}/>} 
          {view==="insights"&&<InsightsView onScan={()=>setScanOpen(true)}/>} 
          {view==="network"&&<NetworkView quietMode={quietMode} setQuietMode={setQuietMode} notify={setToast}/>} 
          {view==="devices"&&<DevicesView lamp={lamp} setLamp={setLamp} quietMode={quietMode} setQuietMode={setQuietMode}/>} 
          {view==="family"&&<FamilyView/>}
        </div>
      </main>
      <nav className="mobile-nav">{navItems.map(item=><button key={item.id} className={view===item.id?"active":""} onClick={()=>setView(item.id)}><Icon name={item.icon}/><span>{item.label}</span></button>)}</nav>
      {scanOpen&&<ScanModal onClose={()=>setScanOpen(false)}/>} 
      {toast&&<div className="toast"><span>✓</span>{toast}</div>}
    </div>
  );
}
