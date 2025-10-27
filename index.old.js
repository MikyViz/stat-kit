export default class Statistic_analyses {
    result = {
        mein: 0,
        median: 0,
        IQR: 0,
        range: 0,
        standartDeviation: 0,
    };
    data;
    constructor(data) {
        this.data = data
    }

    findMein() {
        let sum;
        this.data.forEach(point => {
            sum = (point.length === 1) ? (sum + point) : (sum + point[2]);
        });
        this.result.mein = sum / this.data.length
    }

    findMedian() {
        if (this.data.length % 2 !== 0) {
            this.result.median = this.data[(this.data.length - 1) / 2]
        }
        else {
            this.result.median = (this.data[(this.data.length / 2) - 1] + this.data[(this.data.length / 2)]) / 2
        }
    }
    findStandartDeviation() {
        let netoData = [...this.data]
        if (this.data[0][1]) {
           netoData.map((point)=>{
            point.splice(0,2)
           })
        }
        let quatersSum;
        netoData.forEach((point)=>{
            quatersSum += (point-this.result.mein)*(point-this.result.mein)
        })
        this.result.standartDeviation = quatersSum/this.data.length
    }
    findRange (){
        this.result.range = this.data[this.data.length-1] - this.data[0]
    }
    getResult(){
        this.findMein();
        this.findMedian();
        this.findRange();
        this.findStandartDeviation();
        return this.result
    }
}