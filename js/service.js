document.addEventListener("DOMContentLoaded", function () {

  const menuLinks = document.querySelectorAll('.menu-content a');
  const menuCheckbox = document.getElementById('menu-btn-check');

  function closeMenu() {
    menuLinks.forEach(link => link.classList.add('closed'));

    setTimeout(() => {
      menuCheckbox.checked = false;
      menuLinks.forEach(link => link.classList.remove('closed'));
    }, 300);
  }

  // リンククリックで閉じる
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // スクロールで閉じる
  window.addEventListener('scroll', () => {
    if (menuCheckbox.checked) closeMenu();
  });

  // リサイズで閉じる
  window.addEventListener('resize', () => {
    if (menuCheckbox.checked) closeMenu();
  });

  // フッター付近で非表示
  const bottomMenu = document.querySelector(".bottom-menu");
  const footer = document.querySelector("footer");

  function checkFooterVisibility() {
    if (!footer || !bottomMenu) return;

    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (footerRect.top < windowHeight) {
      bottomMenu.classList.add("hide");
    } else {
      bottomMenu.classList.remove("hide");
    }
  }

  window.addEventListener("scroll", checkFooterVisibility);

});


document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".service__step");
  const items = document.querySelectorAll(".service__item");
  const images = document.querySelectorAll(".service__visual img");
  const links = document.querySelectorAll(".problem-link");

  let isManual = false; // ★ 手動切替フラグ

  function activateService(index) {
    items.forEach(i => i.classList.remove("is-active"));
    images.forEach(img => img.classList.remove("is-active"));

    if (items[index]) items[index].classList.add("is-active");
    if (images[index]) images[index].classList.add("is-active");
  }

  // ▼ スクロール用（紙芝居）
  const observer = new IntersectionObserver(entries => {
    if (isManual) return; // ★ 手動中は無視

    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = [...steps].indexOf(entry.target);
      activateService(index);
    });
  }, { threshold: 0.5 });

  steps.forEach(step => observer.observe(step));

  // ▼ アンカークリック
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const index = Number(link.dataset.index);
      isManual = true;           // ★ Observer停止
      activateService(index);

      document.querySelector("#service").scrollIntoView({
        behavior: "smooth"
      });

      history.pushState(null, "", link.getAttribute("href"));

      // ★ スクロール完了後に Observer 復活
      setTimeout(() => {
        isManual = false;
      }, 800);
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".project-stories__tabs .tab");
  const panels = document.querySelectorAll(".project-stories__panels .panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      
      // ① まず全部非アクティブにする
      tabs.forEach(t => t.classList.remove("is-active"));
      panels.forEach(p => p.classList.remove("is-active"));

      // ② クリックされたタブをアクティブにする
      tab.classList.add("is-active");

      // ③ 対応するパネルをアクティブにする
      const target = tab.dataset.target;
      document.getElementById(target).classList.add("is-active");
    });
  });
});
