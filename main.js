'use strict';

{
  class drank {
    constructor(_className,_classText) {
      this.className = _className
      this.text = _classText

      //  section作成
      // <section class="container">
      const section = document.createElement('section');
      section.classList.add('container');
      
      
      // 表示用テキスト ex.朝のお薬
      // <div class="mes">朝のお薬</div>
      this.mes = document.createElement('div');
      this.mes.textContent = this.text;
      this.mes.classList.add('mes');

      // ボタン配置 飲んだ→23:59
      // <div class="btn">飲んだ</div>
      this.btn = document.createElement('div');
      this.btn.textContent = '飲んだ';
      this.btn.classList.add('btn');

      // クリック時の処理
      this.btn.addEventListener('click', () => {
        // すでにクリックされている場合は何もしない
        if (this.btn.classList.contains('drunk') === true) {
          return;
        }
        // btnクラス削除、drunkクラス追加
        // <div class="drunk">23:59</div>
        this.btn.classList.remove('btn');
        this.btn.classList.add('drunk');
        // クリック時、時刻を表示
        this.btn.textContent = `${getTimeHM()}`;
        // ローカルに保存
        localStorage.setItem(`${this.className}.text`, this.btn.textContent);
        localStorage.setItem('drunkDate.text', `${getDate()}`);
      });

      // 表示用テキストとボタンをsectionに追加
      section.appendChild(this.mes);
      section.appendChild(this.btn);

      const main = document.querySelector('main');
      main.appendChild(section);
      // ローカルストレージを削除または読み込み
      this.removeLocalStorage()
    }

    // ローカルストレージを削除
    removeLocalStorage() {
      // localStorage.removeItem('drankMorning.text');
      // localStorage.removeItem('drankEvening.text');
      
      // F12 Application -> Storage -> Local Storage で中身が確認できる
      // 前回保存日と今日の日付が一致しない かつ 3時以降の場合、削除
      var strValue = localStorage.getItem('drunkDate.text');
      // if (strValue !== `${getDate()}`) {
      if ((strValue !== `${getDate()}`) && (Number(`${getHour()}`) >= 3)) {
        localStorage.removeItem(`${this.className}.text`);
      } else {
        // 同じ日付の場合はデータを読み込む
        this.readLocalStorage();
      }
    }
    readLocalStorage() {
      var strValue = localStorage.getItem(`${this.className}.text`);
      if (strValue !== null) {
        // データを読み込んでからクラスを変更する
        this.btn.textContent = strValue;
        this.btn.classList.remove('btn');
        this.btn.classList.add('drunk');
      }
    }
  }

  // 関数
  function getTimeHM() {
    const d = new Date(Date.now());

    // -6h 時間の基準 6時間引かないとダメな時もある
    var h = d.getHours();
    // h = h - 6;
    if (h < 0) {
      h = h + 24;
    }
    h = String(h).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    
    return h + ":" + m;
  }

  function getHour() {
    const d = new Date(Date.now());
    var hour = d.getHours();
    return hour;
  }

  function getDate() {
    const d = new Date(Date.now());
    var date = d.getDate();
    return date;
  }

  // クラスのインスタンス化
  // new drank('drankMorning','朝のお薬');
  // new drank('drankTest','昼のお薬');
  // new drank('drankEvening','夜のお薬');

  
  // 定数
  const allul = document.querySelectorAll('ul')
  const lilist = document.querySelectorAll('ul > li')
  const pp = document.querySelectorAll('p')
  const confirm = document.getElementById('confirm');
  const freespace = document.getElementById('freespace');

  // ulを全て取得してクリック時に bought クラスをON OFF する
  allul.forEach((ul) => {
    ul.addEventListener('click', e => {
      // クリックされた要素が li かチェックする
      if (e.target.nodeName === 'LI') {
        // toggle で ONOFFする
        e.target.classList.toggle('bought');
        e.target.classList.toggle('buy');
      }
    });
  });

  

  // 買い物決定ボタンで打ち消し線のリストを削除する
  confirm.addEventListener('click', () => {
    lilist.forEach((li) => {
      // 打ち消し線のリストを削除
      if (li.classList.contains('bought') === true) {
        li.remove();
      }
    });
    confirm.remove();
    allul.forEach((ul, index) => {
      var childElementCount = ul.childElementCount ;
      // console.log(childElementCount);
      if (childElementCount == 0) {
        pp[index].remove();

        ul.remove();
        // console.log('index');
        // console.log(index);
      }
      // console.log(childElementCount)
    });
    if (freespace.value === '') {
      freespace.remove();
    }
    
  });


/////////////////////////////////////////////////////
// テストコード（コメントアウト）
/////////////////////////////////////////////////////

  // document.querySelectorAll('li')[4].textContent = 'changed'
  // document.querySelectorAll('ul > li')[6].textContent = 'changed'

  // document.querySelectorAll('ul > li').forEach((li, index) => {
  //   // li.textContent = `${index}番目のli`;
  // });
  // console.log("hello world!");

  // liを全て取得してクリック時に bought クラスをON OFF する
  // document.querySelectorAll('ul > li').forEach((li) => {
  //   li.addEventListener('click',() => {
  //     // toggle で ONOFFできる
  //     li.classList.toggle('bought')
  //     // if (li.classList.contains('bought') === true) {
  //     //   li.classList.remove('bought');
  //     // } else {
  //     //   li.classList.add('bought');
  //     // }
  //   })
  // });


  // allul.forEach((ul) => {
  //   console.log(allul);
  // });

  // All を ALL と間違えて記述していた
  // document.querySelectorALL('ul').forEach((ul) => {
  //   console.log(ul);

}