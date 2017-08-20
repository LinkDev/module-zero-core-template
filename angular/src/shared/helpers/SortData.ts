export let sortData = function sortData(item, sortDirection:string) {
    var $this = $(item);
    $("th.sort").removeClass("headerSortUp");
    $("th.sort").removeClass("headerSortDown");

    $("th.sort a").removeClass("headerSortUp");
    $("th.sort a").removeClass("headerSortDown");
    if (sortDirection.toUpperCase() == "ASC") {
        $this.addClass("headerSortUp");
    }
    else {
        $this.addClass("headerSortDown");
    }
} 