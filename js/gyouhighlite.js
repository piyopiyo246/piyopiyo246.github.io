// ▼②文字列を検索してハイライト用要素を加える処理
function replacer( str, word , att  ) {
    var SearchString = '(' + word + ')';
    var RegularExp = new RegExp( SearchString, "g" );
    var ReplaceString = '<span class="' + att + '">$1</span>';
    var ResString = str.replace( RegularExp , ReplaceString );
    return ResString;
}
// ▼③ハイライトを加える処理
function addhighlight() {
    backupOriginal = document.getElementById("targetspace").innerHTML;
    var forShow = backupOriginal;
    forShow = replacer( forShow, "メルセデス", "mark1" );
    document.getElementById("targetspace").innerHTML = forShow;
}
