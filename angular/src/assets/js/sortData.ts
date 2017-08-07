export let sortData = function sortData(item, sortDirection) {
    var $this = $(item);
    $("th.sort").removeClass("headerSortUp");
    $("th.sort").removeClass("headerSortDown");

    $("th.sort a").removeClass("headerSortUp");
    $("th.sort a").removeClass("headerSortDown");
    if (sortDirection == "ASC") {
        $this.addClass("headerSortUp");
    }
    else {
        $this.addClass("headerSortDown");
    }
}