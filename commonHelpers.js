import{i as c,a as F,S as L}from"./assets/vendor-64b30587.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function l(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=l(t);fetch(t.href,s)}})();const a=document.querySelector(".form"),d=document.querySelector(".gallery"),b=document.querySelector(".load-btn");let u,i,m;a.addEventListener("submit",S);b.addEventListener("click",v);function S(o){o.preventDefault(),d.innerHTML="",document.querySelector(".loader").classList.remove("hidden"),m=a.elements.q.value,i=1,g().then(e=>{e.hits.length===0?(c.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",titleColor:"#FFFFFF",messageColor:"#FFFFFF"}),document.querySelector(".load-btn").classList.add("hidden")):(h(e.hits),document.querySelector(".load-btn").classList.remove("hidden"))}).catch(e=>console.log(e)).finally(()=>{document.querySelector(".loader").classList.add("hidden"),a.reset()})}function q(){const o=document.querySelector(".gallery-item"),{height:e}=o.getBoundingClientRect();return e}function v(){i+=1,document.querySelector(".load-btn").classList.add("hidden"),document.querySelector(".loader").classList.remove("hidden");const o=q();g().then(e=>{e.totalHits-40*i<=0?(c.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#03a9f4",titleColor:"#FFFFFF",messageColor:"#FFFFFF"}),document.querySelector(".load-btn").classList.add("hidden")):(h(e.hits),document.querySelector(".load-btn").classList.remove("hidden"),window.scrollBy({top:o*2,left:0,behavior:"smooth"}))}).catch(e=>console.log(e)).finally(()=>{document.querySelector(".loader").classList.add("hidden")})}const g=async function(){const o="42001706-084c655b89d9d100c07cefb17",e="https://pixabay.com/api/";return(await F.get(e,{params:{key:o,q:m,image_type:"photo",orientation:"horizontal",safesearch:"true",page:i,per_page:40}})).data};function h(o){const e=o.map(l=>{const{webformatURL:n,largeImageURL:t,tags:s,likes:r,views:p,comments:f,downloads:y}=l;return`<li class="gallery-item">
                <a class="gallery-link" href=${t}>
                <img src=${n} alt="${s}" /></a>
                    <ul class="image-desc">
                        <li class="image-desc-item"><p>Likes</p><p>${r}</p></li>
                        <li class="image-desc-item"><p>Views</p><p>${p}</p></li>
                        <li class="image-desc-item"><p>Comments</p><p>${f}</p></li>
                        <li class="image-desc-item"><p>Downloads</p><p>${y}</p></li>
                    </ul>
            </li>`});w(e),u.refresh()}function w(o){o=o.join(""),d.insertAdjacentHTML("beforeend",o),u=new L(".gallery a",{captionDelay:250,captionsData:"alt"})}
//# sourceMappingURL=commonHelpers.js.map
