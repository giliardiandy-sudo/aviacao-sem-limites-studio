import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const BLUE = "#132EFE";
const YELLOW = "#FFD43B";
const NAVY = "#10264A";

const Worker: React.FC<{x: number; delay?: number}> = ({x, delay = 0}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin((frame + delay) / 8) * 7;
  const arm = Math.sin((frame + delay) / 10) * 13;
  return (
    <g transform={`translate(${x} ${430 + bob})`}>
      {/* legs */}
      <path d="M-27 245 L-34 355 L-5 355 L4 260 M18 250 L30 355 L58 355 L48 238" fill={NAVY} />
      <path d="M-42 355 L-2 355 L-2 372 L-50 372 Z M28 355 L68 355 L72 372 L30 372 Z" fill="#172033"/>
      {/* torso and reflective vest */}
      <path d="M-55 95 Q0 70 55 95 L68 250 Q0 275 -68 250 Z" fill={NAVY}/>
      <path d="M-42 102 L-20 95 L-5 246 L-35 250 Z M20 95 L43 102 L36 250 L7 246 Z" fill={YELLOW}/>
      <path d="M-56 176 Q0 188 60 176 L62 190 Q0 205 -58 190 Z" fill="#FFF2A8"/>
      {/* arms */}
      <g transform={`rotate(${arm} -50 115)`}>
        <path d="M-50 112 Q-78 125 -80 195 L-68 224 L-42 214 L-32 145 Z" fill={NAVY}/>
        <circle cx="-66" cy="220" r="15" fill="#8B573D"/>
      </g>
      <g transform={`rotate(${-arm} 50 115)`}>
        <path d="M50 112 Q78 125 80 195 L68 224 L42 214 L32 145 Z" fill={NAVY}/>
        <circle cx="66" cy="220" r="15" fill="#8B573D"/>
      </g>
      {/* neck and head */}
      <rect x="-17" y="72" width="34" height="35" rx="12" fill="#8B573D"/>
      <ellipse cx="0" cy="35" rx="48" ry="55" fill="#9B6246"/>
      <path d="M-47 25 Q-45 -30 2 -27 Q49 -23 48 28 Q26 5 8 5 Q-18 9 -47 25" fill="#171717"/>
      <path d="M-29 48 Q0 66 29 48" stroke="#40251D" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <circle cx="-17" cy="35" r="5" fill="#172033"/>
      <circle cx="17" cy="35" r="5" fill="#172033"/>
      <path d="M-9 81 Q0 88 9 81" stroke="#40251D" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* badge */}
      <rect x="-14" y="130" width="28" height="23" rx="4" fill="#FFFFFF"/>
      <circle cx="0" cy="141" r="5" fill={BLUE}/>
    </g>
  );
};

export const PrimeiraDemonstracao: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 25, 270, 300], [0, 1, 1, 0]);
  const beltX = interpolate(frame, [0, 300], [0, -180]);
  const planeY = Math.sin(frame / 18) * 9;
  return (
    <AbsoluteFill style={{backgroundColor: "#F2F6FC", fontFamily: "Arial, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{background: "linear-gradient(180deg,#DCEBFF 0%,#F5F8FC 58%,#D8E1EF 100%)"}}/>
      {/* airport windows */}
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position:"absolute"}}>
        <rect x="0" y="0" width="1080" height="700" fill="#DCEBFF"/>
        {[0,1,2,3].map((i)=><g key={i}><rect x={40+i*260} y="110" width="210" height="480" rx="18" fill="#8DB8E8" opacity=".55"/><path d={`M${145+i*260} 110 V590`} stroke="#FFFFFF" strokeWidth="12" opacity=".8"/></g>)}
        <path d="M0 710 H1080" stroke="#FFFFFF" strokeWidth="20"/>
        <rect x="0" y="1320" width="1080" height="600" fill="#CBD5E3"/>
        <path d="M0 1430 H1080" stroke="#AAB8CA" strokeWidth="8"/>
        {/* moving baggage conveyor */}
        <rect x="80" y="1120" width="920" height="210" rx="40" fill="#27364A"/>
        <rect x="100" y="1140" width="880" height="150" rx="28" fill="#53657C"/>
        <g transform={`translate(${beltX} 0)`}>
          {[0,1,2,3,4,5,6,7].map(i=><rect key={i} x={140+i*150} y="1170" width="95" height="90" rx="12" fill={i%2? "#B97842":"#7A513A"}/>)}
        </g>
        <path d="M100 1330 L80 1400 M980 1330 L1000 1400" stroke="#27364A" strokeWidth="22"/>
        <g transform={`translate(0 ${600 + planeY})`} opacity=".9">
          <path d="M790 240 Q860 205 930 240 L1020 260 L930 280 Q860 315 790 280 L730 275 L730 245 Z" fill="#FFFFFF" stroke={BLUE} strokeWidth="6"/>
          <path d="M850 240 L880 175 L900 180 L890 245 M850 280 L880 340 L900 335 L890 275" fill="#FFFFFF" stroke={BLUE} strokeWidth="5"/>
        </g>
      </svg>
      {/* characters */}
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" style={{position:"absolute"}}>
        <Worker x={350} delay={0}/>
        <Worker x={730} delay={30}/>
      </svg>
      {/* title and caption */}
      <div style={{position:"absolute",top:105,left:65,right:65,opacity:titleOpacity,textAlign:"center"}}>
        <div style={{display:"inline-block",background:BLUE,color:"white",padding:"18px 34px",borderRadius:18,fontWeight:900,fontSize:34,letterSpacing:2}}>AVIAÇÃO SEM LIMITES</div>
        <div style={{marginTop:34,fontSize:66,fontWeight:900,color:NAVY,lineHeight:1.05}}>BASTIDORES DO AEROPORTO</div>
        <div style={{marginTop:20,fontSize:32,color:"#31445E",fontWeight:700}}>O trabalho que faz a aviação acontecer!</div>
      </div>
      <div style={{position:"absolute",bottom:100,left:60,right:60,textAlign:"center",background:"rgba(19,46,254,.94)",color:"white",padding:"24px 30px",borderRadius:22,fontSize:34,fontWeight:800}}>
        Por trás de cada voo, existe uma equipe inteira!
      </div>
      <div style={{position:"absolute",top:35,right:40,color:NAVY,fontSize:22,fontWeight:700}}>DEMO • 2D VETORIAL</div>
    </AbsoluteFill>
  );
};