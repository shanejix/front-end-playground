(function () {
    function datePicker() {

        this.say = function () {
            console.log('datepicker')
        }

        this.getMonthData = function (year, month, date) {
            //用于存储日历6*7的数据
            let result = []
            date = date || new Date().getDate()
            year = year || new Date().getFullYear()
            month = month || new Date().getMonth() + 1


            //当月的第一天，日期对象
            let firstDayOfThisMonth = new Date(year, month - 1, 1)//利用越界处理
            //当月第一天是星期几
            let firstDayOfWeekday = firstDayOfThisMonth.getDay() || 7//如果0，代表周日，手动改为7

            //当月的最后一天，日期对象
            let lastDayOfThisMonth = new Date(year, month, 0)//利用越界处理
            //当月的最后一天日期
            let lastDateOfThisMonth = lastDayOfThisMonth.getDate()

            //上月的最后一天，日期对象
            let lastDayOfLastMonth = new Date(year, month - 1, 0)//利用越界处理
            //上月最后一天的日期
            let lastDateOfLastMonth = lastDayOfLastMonth.getDate()

            //上月显示日期数量
            let lastMonthDaysCount = firstDayOfWeekday - 0


            console.log('firstDayOfThisMonth:', firstDayOfThisMonth)
            console.log('firstDayOfWeekday:', firstDayOfWeekday)

            console.log('lastDayOfLastMonth:', lastDayOfLastMonth)
            console.log('lastDateOfLastMonth:', lastDateOfLastMonth)

            console.log('lastDayOfThisMonth:', lastDayOfThisMonth)
            console.log('lastDateOfThisMonth:', lastDateOfThisMonth)

            console.log('lastMonthDaysCount:', lastMonthDaysCount)


            //生成每一月的数据

            for (let i = 0; i < 7 * 6; i++) {
                //计算的当前日期
                let date = i + 1 + 1 - lastMonthDaysCount//注意这里加两次1，为了修正偏移
                //将要显示的当前日日期
                let showDate = date
                //当前月份
                let thisMonth = month

                if (date <= 0) {
                    //上一月
                    thisMonth = month - 1
                    showDate = lastDateOfLastMonth + date
                } else if (date > lastDateOfThisMonth) {
                    //下一月
                    thisMonth = month + 1
                    showDate = showDate - lastDateOfThisMonth

                }

                //修正month越界

                if (thisMonth === 0) {
                    thisMonth = 12
                }

                if (thisMonth === 13) {
                    thisMonth = 1
                }

                result.push({
                    date,
                    showDate,
                    thisMonth
                })

            }
            this.data = {
                year,
                month,
                date,
                result
            }
            return this.data
        }

        this.generCanendar = function (year, month, date) {

            let monthData = this.data || this.getMonthData(year, month, date)

            date = date || monthData.date

            let html = "<header id='datepicker-container-body-header'>" +
                "<sapn>" +
                "<a id='year-pre'>&lt</a>" +
                "<span>" + monthData.year + "</span>" +
                "<a id='year-next'>&gt</a>" +
                "年" +
                "</sapn>" +
                "<sapn>" +
                "<a id='month-pre'>&lt</a>" +
                "<span>" + monthData.month + "</span>" +
                "<a id='month-next'>&gt</a>" +
                "月" +
                "</sapn>" +
                "<sapn>" +
                "<a id='date-pre'>&lt</a>" +
                "<span>" + monthData.date + "</span>" +
                "<a id='date-next'>&gt</a>" +
                "日" +
                "</sapn>" +
                "</header>" +
                "<main id='datepicker-container-body-main'>" +
                "<table>" +
                "<thead>" +
                "<tr>" +
                "<td>一</td>" +
                "<td>二</td>" +
                "<td>三</td>" +
                "<td>四</td>" +
                "<td>五</td>" +
                "<td>六</td>" +
                "<td>日</td>" +
                "</tr>" +
                "</thead>" +
                "<tbody>";

            for (let i = 0; i < monthData.result.length; i++) {
                let showDate = monthData.result[i].showDate
                if (i % 7 === 0) {
                    html += "<tr>"
                }
                // console.log(monthData.month,monthData.result[i].thisMonth)
                month = monthData.result[i].thisMonth
                if (showDate === date && monthData.month === monthData.result[i].thisMonth) {
                    html += `<td class='checked' year=${year} month=${month} > ${showDate}  </td>`
                } else {
                    html += `<td  year=${year} month=${month} > ${showDate}  </td>`
                }


                if (i % 7 === 6) {
                    html += "</tr>"
                }

            }


            html += "</tbody>" +
                "</table>" +
                "</main>"

            return html

        }

        this.render = function (nodeId, html) {
            html = html || this.generCanendar()
            document.getElementById(nodeId).innerHTML = html
        }

        this.validate = function (value) {

            let flag = true

            if (!value.match(/[^\d-]/g)) {
                let dateArr = value.split('-')
                let [year, month, date] = dateArr

                year = parseInt(year)
                month = parseInt(month)
                date = parseInt(date)

                if (month < 0 || month > 12) {
                    alert('月份有误')
                    flag = false
                }

                if (date < 0 || date > 31) {
                    alert('日期有误')
                    flag = false
                }

                return {
                    year,
                    month,
                    date
                }


            } else {
                alert('请输入正确的格式')
                flag = false
            }

            return flag


        }

        this.init = function (nodeId, year, month, date) {
            this.getMonthData(year, month, date)
            let html = this.generCanendar(year, month, date)
            this.render(nodeId, html)
            this.addEvents()
        }

        this.addEvents = function () {
            let data = this.data
            let year = data.year
            let month = data.result[15].thisMonth
            let date = data.date

            let that = this


            let nodeInput = document.getElementById('datepicker-container-input')
            let nodeBody = document.getElementById('datepicker-container-body')

            //切换月份
            console.log(year, month, date)

            document.getElementById('month-pre').onclick = function () {
                month--
                that.init('datepicker-container-body', year, month, date)
            }
            document.getElementById('month-next').onclick = function () {
                month++
                that.init('datepicker-container-body', year, month, date)

            }
            //切换年份

            document.getElementById('year-pre').onclick = function () {
                year--
                that.init('datepicker-container-body', year, month, date)
            }
            document.getElementById('year-next').onclick = function () {
                year++
                that.init('datepicker-container-body', year, month, date)

            }
            //切换天
            document.getElementById('date-pre').onclick = function () {
                date--
                that.init('datepicker-container-body', year, month, date)
            }
            document.getElementById('date-next').onclick = function () {
                date++
                that.init('datepicker-container-body', year, month, date)

            }

            //点击弹窗
            document.getElementById('datepicker-container-body').onclick = function (e) {



                console.log(nodeInput)
                if (e.target.tagName === 'TD') {
                    console.log(e.target)
                    console.log(e.target.getAttribute('year'))
                    console.log(e.target.getAttribute('month'))

                    let year = e.target.getAttribute('year')
                    let month = e.target.getAttribute('month')
                    let date = e.target.innerHTML

                    alert(`你选择的时间是${year}年${month}月${date}日`)

                    nodeInput.value = `${year}-${month}-${date}`

                    // nodeBody.classList.add('datepicker-container-body-hidden')

                    nodeBody.style.display = 'none'

                }
                // that.init('datepicker-container-body', year, month, date)
            }

            //input enter
            document.getElementById('datepicker-container-input').onkeydown = function (e) {
                console.log(e)

                // console.log(that)

                if (e.keyCode === 13) {

                    let dateObj = that.validate(e.target.value)
                    console.log(date)
                    if (dateObj) {
                        let { year, month, date } = dateObj
                        that.init('datepicker-container-body', year, month, date)

                        // nodeBody.classList.add('datepicker-container-body-show')

                        nodeBody.style.display = 'block'
                    } else {
                        alert('时间有误')
                    }
                }
            }

        }

    }


    window.datePicker = new datePicker()
})()