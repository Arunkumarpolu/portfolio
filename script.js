window.addEventListener("load", () => {
const loader = document.getElementById("loader");
if(loader){
loader.style.opacity = "0";
loader.style.visibility = "hidden";
setTimeout(() => {
loader.remove();
},500);
}
});
/*==================================================
STICKY HEADER
==================================================*/
const header = document.getElementById("header");
window.addEventListener("scroll",()=>{
if(window.scrollY > 80){
header.classList.add("scrolled");
}else{
header.classList.remove("scrolled");
}
});
/*==================================================
SCROLL PROGRESS BAR
==================================================*/
const progressBar = document.getElementById("progress-bar");
window.addEventListener("scroll",()=>{
const scrollTop = document.documentElement.scrollTop;
const height = document.documentElement.scrollHeight -
document.documentElement.clientHeight;
const progress = (scrollTop / height) * 100;
progressBar.style.width = progress + "%";
});
/*==================================================
BACK TO TOP
==================================================*/
const topBtn = document.getElementById("backToTop");
window.addEventListener("scroll",()=>{
if(window.scrollY > 400){
topBtn.style.opacity="1";
topBtn.style.visibility="visible";
}else{
topBtn.style.opacity="0";
topBtn.style.visibility="hidden";
}
});
topBtn.addEventListener("click",(e)=>{
e.preventDefault();
window.scrollTo({
top:0,
behavior:"smooth"
});
});
/*==================================================
MOBILE MENU
==================================================*/
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-menu");
const overlay = document.querySelector(".menu-overlay");
if(menuBtn){
menuBtn.addEventListener("click",()=>{
mobileMenu.classList.add("active");
overlay.classList.add("active");
});
}
if(closeBtn){
closeBtn.addEventListener("click",()=>{
mobileMenu.classList.remove("active");
overlay.classList.remove("active");
});
}
if(overlay){
overlay.addEventListener("click",()=>{
mobileMenu.classList.remove("active");
overlay.classList.remove("active");
});
}
/*==================================================
ACTIVE MENU
==================================================*/
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll",()=>{
let current = "";
sections.forEach(section=>{
const top = section.offsetTop - 120;
const height = section.offsetHeight;
if(pageYOffset >= top){
current = section.getAttribute("id");
}
});
navLinks.forEach(link=>{
link.classList.remove("active");
if(link.getAttribute("href")==="#" + current){
link.classList.add("active");
}
});
});
/*==================================================
SMOOTH SCROLL
==================================================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
anchor.addEventListener("click",function(e){
e.preventDefault();
const target=document.querySelector(this.getAttribute("href"));
if(target){
target.scrollIntoView({
behavior:"smooth"
});
}
});
});
/*==================================================
DARK MODE
==================================================*/
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");
if(currentTheme === "light"){
document.body.classList.add("light");
if(themeToggle){
themeToggle.innerHTML='<i class="fa-solid fa-sun"></i>';
}
}
if(themeToggle){
themeToggle.addEventListener("click",()=>{
document.body.classList.toggle("light");
const light=document.body.classList.contains("light");
localStorage.setItem("theme",light?"light":"dark");
themeToggle.innerHTML=light
?'<i class="fa-solid fa-sun"></i>'
:'<i class="fa-solid fa-moon"></i>';
});
}
/*==================================================
TYPING ANIMATION
==================================================*/
const typingElement=document.getElementById("typing-text");
const words=[
"Technical SEO Specialist",
"Local SEO Expert",
"SEO Specialist",
"Digital Marketing Professional",
"Website Optimization Expert",
"Search Engine Optimization Specialist",
"SEO Analyst",
"Programmatic SEO Strategist",
"On-Page SEO Specialist",
"Off-Page SEO Expert",
];
let wordIndex=0;
let charIndex=0;
let deleting=false;
function typeEffect(){
if(!typingElement) return;
const currentWord=words[wordIndex];
typingElement.textContent=currentWord.substring(0,charIndex);
if(!deleting){
charIndex++;
if(charIndex>currentWord.length){
deleting=true;
setTimeout(typeEffect,1800);
return;
}
}else{
charIndex--;
if(charIndex===0){
deleting=false;
wordIndex=(wordIndex+1)%words.length;
}
}
setTimeout(typeEffect,deleting?40:80);
}
typeEffect();
/*==================================================
COUNTER
==================================================*/
const counters=document.querySelectorAll(".counter");
const counterObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const counter=entry.target;
const target=+counter.dataset.target;
let count=0;
const speed=target/100;
const update=()=>{
count+=speed;
if(count<target){
counter.innerText=Math.ceil(count);
requestAnimationFrame(update);
}else{
counter.innerText=target+"+";
}
};
update();
counterObserver.unobserve(counter);
}
});
},{threshold:.5});
counters.forEach(counter=>{
counterObserver.observe(counter);
});
/*==================================================
SKILL BAR ANIMATION
==================================================*/
const skillBars=document.querySelectorAll(".skill-progress");
const skillObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const bar=entry.target;
const value=bar.classList.contains("technical")?"95%":
bar.classList.contains("onpage")?"95%":
bar.classList.contains("offpage")?"90%":
bar.classList.contains("local")?"94%":
bar.classList.contains("keyword")?"92%":
bar.classList.contains("analytics")?"88%":"80%";
bar.style.width=value;
skillObserver.unobserve(bar);
}
});
},{threshold:.5});
skillBars.forEach(bar=>{
bar.style.width="0";
skillObserver.observe(bar);
});
/*==================================================
SCROLL REVEAL
==================================================*/
const revealElements=document.querySelectorAll(
".section-heading,.about-wrapper,.timeline-item,.skill-item,.tool-card,.project-card,.service-card,.education-card,.contact-card"
);
const revealObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{
threshold:.15
});
revealElements.forEach(el=>{
el.classList.add("hidden-animation");
revealObserver.observe(el);
});
/*==================================================
TOAST NOTIFICATION
==================================================*/
function showToast(message,type){
let toast=document.createElement("div");
toast.className="toast "+type;
toast.innerHTML=message;
document.body.appendChild(toast);
setTimeout(()=>{
toast.classList.add("show");
},100);
setTimeout(()=>{
toast.classList.remove("show");
setTimeout(()=>{
toast.remove();
},300);
},3000);
}
/*==================================================
IMAGE LAZY LOADING
==================================================*/
const lazyImages=document.querySelectorAll("img[data-src]");
const lazyObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const img=entry.target;
img.src=img.dataset.src;
img.removeAttribute("data-src");
lazyObserver.unobserve(img);
}
});
});
lazyImages.forEach(img=>{
lazyObserver.observe(img);
});
/*==================================================
SEO SCORE ANIMATION
==================================================*/
const seoScore=document.querySelector(".seo-score-number");
if(seoScore){
let score=0;
const target=100;
const interval=setInterval(()=>{
score++;
seoScore.innerHTML=score+"%";
if(score>=target){
clearInterval(interval);
}
},20);
}
/*==================================================
PERFORMANCE
==================================================*/
window.addEventListener("load",()=>{
document.body.classList.add("loaded");
});
/*==================================================
KEYBOARD ACCESSIBILITY
==================================================*/
document.addEventListener("keydown",(e)=>{
if(e.key==="Escape"){
const mobileMenu=document.getElementById("mobile-menu");
const overlay=document.querySelector(".menu-overlay");
if(mobileMenu){
mobileMenu.classList.remove("active");
}
if(overlay){
overlay.classList.remove("active");
}
}
});
/*==================================================
REDUCED MOTION
==================================================*/
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
if(reduceMotion.matches){
document.documentElement.style.scrollBehavior="auto";
}
/*==================================================
CONTACT FORM SUBMISSION
==================================================*/
const contactForm = document.querySelector("#contactForm");
if(contactForm){
contactForm.addEventListener("submit",(e)=>{
e.preventDefault();
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

// Validation
if(
name.value.trim() === "" ||
email.value.trim() === "" ||
message.value.trim() === ""
){
showToast("Please fill all fields.","error");
return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email.value)){
showToast("Please enter a valid email.","error");
return;
}

// Submit
const submitBtn = contactForm.querySelector("button[type='submit']");
const originalBtnText = submitBtn.textContent;
submitBtn.disabled = true;
submitBtn.textContent = "Sending...";

fetch(contactForm.action, {
method: "POST",
body: new FormData(contactForm),
headers: {"Accept": "application/json"}
})
.then((response) => {
if(response.ok){
showToast("Message sent successfully!","success");
contactForm.reset();
} else {
throw new Error("Submission failed");
}
})
.catch(() => {
showToast("Something went wrong. Please try again or email me directly.","error");
})
.finally(() => {
submitBtn.disabled = false;
submitBtn.textContent = originalBtnText;
});
});
}
