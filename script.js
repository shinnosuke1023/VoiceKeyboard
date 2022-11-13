var mytable = document.getElementById("tbl");
 
for (var i=0; i < mytable.rows.length; i++) {
    for (var j=0; j < mytable.rows[i].cells.length; j++) {
        mytable.rows[i].cells[j].id = i + "-" + j;
        mytable.rows[i].cells[j].onclick = clicked;
    }
}


const voiceSelect = document.querySelector('#voice-select')

// selectタグの中身を声の名前が入ったoptionタグで埋める
function appendVoices() {
// ①　使える声の配列を取得
// 配列の中身は SpeechSynthesisVoice オブジェクト
const voices = speechSynthesis.getVoices()
voiceSelect.innerHTML = ''
voices.forEach(voice => { //　アロー関数 (ES6)
    // 日本語と英語以外の声は選択肢に追加しない。
    if(!voice.lang.match('ja|en-US')) return
    const option = document.createElement('option')
    option.value = voice.name
    option.text  = `${voice.name} (${voice.lang})` //　テンプレートリテラル (ES6)
    option.setAttribute('selected', voice.default)
    voiceSelect.appendChild(option)
});
}

appendVoices()

// ② 使える声が追加されたときに着火するイベントハンドラ。
// Chrome は非同期に(一個ずつ)声を読み込むため必要。
speechSynthesis.onvoiceschanged = e => {
appendVoices()
}

function clicked(e) {
    var txt = document.getElementById("result");
    txt.textContent = e.target.id + "がクリックされました。値は：" + e.target.innerHTML;
    // 発言を作成
    const uttr = new SpeechSynthesisUtterance(e.target.innerHTML)
    // ③ 選択された声を指定
uttr.voice = speechSynthesis
.getVoices()
.filter(voice => voice.name === voiceSelect.value)[0]
    // 発言を再生 (発言キューに発言を追加)
    speechSynthesis.speak(uttr)

}