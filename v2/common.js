/* =========================================================
   VISIT 리뉴얼 v2 — 공통 컴포넌트 (모든 페이지 공용)
   · VISIT.header()  헤더 + 햄버거 메뉴
   · VISIT.contact() 문의 섹션 (메일 · 버튼 · 주소)
   · VISIT.footer()  푸터
   페이지 <body data-page="...">에 맞춰 현재 메뉴를 표시합니다.
   각 함수는 호출한 <script> 자리에 마크업을 넣습니다.
   ========================================================= */
document.documentElement.classList.add('js');

(function(){
  const CONTACT='https://visitinc.kr/contact';
  const IR='https://visitinc.kr/assets/2025_VISIT_Service_Introduction.pdf';
  const MENU=[
    ['Main','./','home'],
    ['Business','business.html','business'],
    ['Shop','shop.html','shop',[
      ['Product','shop.html','shop'],
      ['Tech','tech.html','tech'],
      ['Store','store.html','store'],
    ]],
    ['Newsroom','news.html','news'],
    ['Team','team.html','team'],
  ];
  const FAMILY=[
    ['https://gwba.co.kr/','강원상생기업연합회'],
    ['https://www.make-works.kr/','make-works'],
    ['https://privatepark.co.kr/','privatepark'],
    ['https://www.camp360v.com/','camp360v'],
    ['https://roadon.co.kr/','로드온'],
    ['https://rankingfish.com/','랭킹피쉬'],
  ];

  const page=()=>document.body.dataset.page||'';
  const put=html=>document.currentScript.insertAdjacentHTML('beforebegin',html);
  const cur=(on,attr)=>on?` aria-current="${attr}"`:'';
  const href=(h,k)=>page()==='home'&&k==='home'?'#top':h;
  // 데스크톱: 하위 메뉴는 hover/focus 드롭다운
  const links=()=>{const p=page();return MENU.map(([t,h,k,sub])=>{
    if(!sub)return `<a href="${href(h,k)}"${cur(p===k,'page')}>${t}</a>`;
    const inSub=sub.some(s=>s[2]===p);
    return `<div class="dd"><a href="${h}"${cur(inSub,'true')} aria-haspopup="true">${t}<svg class="car" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg></a><div class="dd-menu">${
      sub.map(([st,sh,sk])=>`<a href="${sh}"${cur(p===sk,'page')}>${st}</a>`).join('')}</div></div>`;}).join('');};
  // 모바일: 하위 메뉴를 항상 펼쳐서 표시
  const mlinks=()=>{const p=page();return MENU.map(([t,h,k,sub])=>{
    if(!sub)return `<a href="${href(h,k)}"${cur(p===k,'page')}>${t}</a>`;
    const inSub=sub.some(s=>s[2]===p);
    return `<div class="mgrp"><a href="${h}"${cur(inSub,'true')}>${t}</a><div class="msub">${
      sub.map(([st,sh,sk])=>`<a href="${sh}"${cur(p===sk,'page')}>${st}</a>`).join('')}</div></div>`;}).join('');};

  window.VISIT={CONTACT,IR,
    header(){
      const home=page()==='home'?'#top':'./';
      put(`<header class="hdr" id="hdr">
  <div class="wrap">
    <a href="${home}" class="logo" aria-label="VISIT 홈"><img src="../assets/img/${document.body.classList.contains('lt')?'logo.png':'logo_white.png'}" alt="VISIT"></a>
    <nav class="nav" aria-label="주 메뉴">${links()}</nav>
    <div class="hdr-cta">
      <span class="lang"><b>KR</b><i>/</i><a href="${home}">EN</a></span>
      <a class="btn btn-sm btn-white" href="${CONTACT}">1:1 문의</a>
    </div>
    <button class="burger" id="burger" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="mnav"><span></span></button>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="모바일 메뉴">${mlinks()}</nav>`);
    },
    contact(){
      put(`<section class="sec contact" id="contact">
  <div class="wrap">
    <div class="rv">
      <p class="eyebrow">Contact</p>
      <a class="mail" href="mailto:info@visitinc.kr">info@visitinc.kr</a>
    </div>
    <dl class="addr rv">
      <div><dt>본사</dt><dd>강원특별자치도 원주시 지정면 신평석화로 236-1, 1동<span>(26358)</span></dd></div>
      <div><dt>기업부설연구소</dt><dd>서울 영등포구 여의도동 여의대로 8, A2002호<span>(07320)</span></dd></div>
      <div><dt>싱가폴 법인</dt><dd>1 Raffles Place, #20-02 One Raffles Place, Singapore<span>(048616)</span></dd></div>
    </dl>
    <div class="etc rv">
      <a href="${IR}" target="_blank" rel="noopener"><span class="ic"><img src="../assets/img/doc_icon.png" alt=""></span><span><b>회사 소개서</b><small>다운로드하기</small></span></a>
      <a href="${CONTACT}"><span class="ic"><img src="../assets/img/qa_icon.png" alt=""></span><span><b>1:1 문의하기</b><small>제휴 문의하기</small></span></a>
    </div>
  </div>
</section>`);
    },
    footer(){
      put(`<footer class="ftr">
  <div class="wrap">
    <div class="l"><img src="../assets/img/logo_gray.png" alt="VISIT"><a href="privacy.html"${page()==='privacy'?' aria-current="page"':''}>개인정보 처리방침</a><span class="en">© 2026 VISIT Inc.</span></div>
    <div><label for="family">패밀리 사이트</label>
      <select id="family">
        <option value="">FAMILY SITE</option>
        ${FAMILY.map(([u,t])=>`<option value="${u}">${t}</option>`).join('')}
      </select>
    </div>
  </div>
</footer>`);
    },
  };

  // 공통 동작: 헤더 배경 · 햄버거 메뉴 · 패밀리 사이트 · 등장 모션
  document.addEventListener('DOMContentLoaded',()=>{
    const hdr=document.getElementById('hdr'),burger=document.getElementById('burger');
    if(hdr&&burger){
      const onScroll=()=>hdr.classList.toggle('solid',scrollY>20||document.body.classList.contains('menu-open'));
      addEventListener('scroll',onScroll,{passive:true});onScroll();
      const setMenu=o=>{document.body.classList.toggle('menu-open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'메뉴 닫기':'메뉴 열기');onScroll();};
      burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
      document.querySelectorAll('.mnav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
      addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){setMenu(false);burger.focus();}});
      matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
    }
    const fam=document.getElementById('family');
    if(fam)fam.addEventListener('change',e=>{if(e.target.value)window.open(e.target.value,'_blank','noopener');e.target.value='';});

    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
    document.querySelectorAll('.rv').forEach(el=>io.observe(el));
  });
})();
