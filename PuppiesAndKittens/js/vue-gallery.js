// Flickr API key
const API_KEY = "e17082f9aa604301426b7d8091258e45";

/**
 * ※参考：コードのひな形
 * ここまで学習した内容を基に、Vueのコードを書くときの「ひな形」を用意しました。課題に取り組む際の参考にしてください。
 */

/**
 * ----------------------------------
 * Tooltipを表示するカスタムディレクティブ
 * ----------------------------------
 */

Vue.directive('tooltip', {
  bind(el, binding) {
    $(el).tooltip({
      title: binding.value,
      placement: 'bottom',
    });
  },
  unbind(el) {
    $(el).tooltip('dispose');
  },
});

new Vue({
  el: "#gallery", // elオプションの値に '#gallery' を設定

  components: {
    // ローカル登録するコンポーネントを設定
    // ( コンポーネントを利用しない場合は components: {}, は削除すること )
    //'animal-section':animalsection
  },

  data: {
    // 利用するデータを設定
    // greeting: "確認用テキスト―後で削除",
    photos: [],
    total: 0,
  },

  created() {
    console.log("created");
    // Vueが読み込まれたときに実行する処理を定義
    let url_for_cat = getRequestURL("cat");

    $.getJSON(url_for_cat, (data) => {
      console.log("getJson_for_cat");
      if (data.stat !== "ok") {
        console.log("getJsonError:", data.stat);
        return;
      }
      console.log("data.stat:", data.stat);

      this.total = data.photos.total;
      // this.photos
      const cat_photos = data.photos.photo.map((photo) => ({
        id: photo.id,
        imageURL: getFlickrImageURL(photo, "q"),
        pageURL: getFlickrPageURL(photo),
        text: getFlickrText(photo),
      }));

      this.photos.push(...cat_photos);

      console.log("afterCat",this.photos);
    });

    let url_for_dog = getRequestURL("dog");

    $.getJSON(url_for_dog, (data) => {
      console.log("getJson_for_dog");
      if (data.stat !== "ok") {
        console.log("getJsonError:", data.stat);
        return;
      }
      console.log("data.stat:", data.stat);

      this.total = data.photos.total;
      //this.photos 
      const dog_photos = data.photos.photo.map((photo) => ({
        id: photo.id,
        imageURL: getFlickrImageURL(photo, "q"),
        pageURL: getFlickrPageURL(photo),
        text: getFlickrText(photo),
      }));
      console.log("afterDog",this.photos);
      this.photos.push(...dog_photos);
    });
  },

  methods: {
    // 呼び出して利用できる関数を定義( aaa や bbb の関数名を書き換えること。関数の追加も可能 )
    bbb() {},
  },
});

function getRequestURL(searchText) {
  const parameters = $.param({
    method: "flickr.photos.search",
    api_key: API_KEY,
    text: searchText, // 検索テキスト
    sort: "interestingness-desc", // 興味深さ順
    per_page: 4, // 取得件数
    license: "4", // Creative Commons Attributionのみ
    extras: "owner_name,license", // 追加で取得する情報
    format: "json", // レスポンスをJSON形式に
    nojsoncallback: 1, // レスポンスの先頭に関数呼び出しを含めない
  });
  const url = `https://api.flickr.com/services/rest/?${parameters}`;
  console.log("RequestURL=", url);
  return url;
}

function getFlickrImageURL(photo, size) {
  let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
  if (size) {
    // サイズ指定ありの場合
    url += `_${size}`;
  }
  url += ".jpg";
  return url;
}

function getFlickrPageURL(photo) {
  return `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
}

function getFlickrText(photo) {
  let text = `"${photo.title}" by ${photo.ownername}`;
  if (photo.license === "4") {
    // Creative Commons Attribution（CC BY）ライセンス
    text += " / CC BY";
  }
  return text;
}

const animalsection = {
  props:['animal'],
  templates:`
  <a
  v-for="photo in photos"
  v-bind:key="photo.id"
  v-bind:href="photo.pageURL"
  v-tooltip="photo.text"
  class="d-inline-block"
  target="_blank"
>
  <img
    v-bind:src="photo.imageURL"
    v-bind:alt="photo.text"
    width="150"
    height="150"
  />
</a>
  `
};
