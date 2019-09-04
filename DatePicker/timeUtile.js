(function () {

    //获取月份的第一天
    function getFirstDayOfMonth(year,month) {
        return new Date(year,month-1,1).getDate()
    }

    //获取月份的最后一天
    function getLastDayOfMonth(year,month) {
        return new Date(year,month,0).getDate()
    }

    //获取月份的天数
    function getDaysOfMonth(year,month) {
        return new Date(year,month,0).getDate()-0
    }


    let timeUtile = {
        getFirstDayOfMonth,
        getLastDayOfMonth,
        getDaysOfMonth
    }

    window.timeUtile=timeUtile
})()