const unitTestingTask = require("../unitTestingTask");
var morningDate = "2022-08-03T09:30:30.030";
var afternoonDate = "2022-08-03T13:05:05.005"

function getTimezoneOffset(extended) {
    function z(n){return (n<10? '0' : '') + n}
    var offset = new Date().getTimezoneOffset();
    var sign = offset < 0? '+' : '-';
    offset = Math.abs(offset);
    return sign + z(offset/60 | 0) + (extended? ':' : '') + z(offset%60);
}

describe("Testing invalid parameters", () =>{
    test("Should return date in english when trying to use pt-br language.", () =>{
        unitTestingTask.lang('pt-br');
        expect(unitTestingTask("YY/M/D", morningDate)).toEqual("22/8/We");
    });
    test("Should raise an exception when format is 1234.", () =>{
        expect(() => { unitTestingTask(1234, morningDate)}).toThrow(new TypeError('Argument `format` must be a string'));
    });
    test("Shoulde raise an excepetion when date is a new object", () =>{
        var date = new Object() 
        expect(() => { unitTestingTask("DD/MM/YYYY", date) }).toThrow(new TypeError('Argument `date` must be instance of Date or Unix Timestamp or ISODate String'));
    });
});

describe ("Unit Testing all date formats", () =>{
    test("Should return 2022 when using format: YYYY", () =>{
        expect(unitTestingTask("YYYY", morningDate)).toEqual("2022");
    });
    test("Should return 22 when using format: YY", () =>{
        expect(unitTestingTask("YY", morningDate)).toEqual("22");
    });
    test("Should return August when using format: MMMM", () =>{
        expect(unitTestingTask("MMMM", morningDate)).toEqual("August");
    });
    test("Should return Aug when using format: MMM", () =>{
        expect(unitTestingTask("MMM", morningDate)).toEqual("Aug");
    });
    test("Should return 08 when using format: MM", () =>{
        expect(unitTestingTask("MM", morningDate)).toEqual("08");
    });
    test("Should return Wednesday when using format: DDD", () =>{
        expect(unitTestingTask("DDD", morningDate)).toEqual("Wednesday");
    });
    test("Should return Wed when using format: DD", () =>{
        expect(unitTestingTask("DD", morningDate)).toEqual("Wed");
    });
    test("Should return We when using format: D", () =>{
        expect(unitTestingTask("D", morningDate)).toEqual("We");
    });
    test("Should return 03 when using format: dd", () =>{
        expect(unitTestingTask("dd", morningDate)).toEqual("03");
    });
    test("Should return 3 when using format: d", () =>{
        expect(unitTestingTask("d", morningDate)).toEqual("3");
    });
    test("Should return 09 when using format: HH and Hour is 9", () =>{
        expect(unitTestingTask("HH", morningDate)).toEqual("09");
    });
    test("Should return 13 when using format: HH and hour is 13", () =>{
        expect(unitTestingTask("HH", afternoonDate)).toEqual("13");
    });
    test("Should return 9 when using format: H and hour is 9" , () =>{
        expect(unitTestingTask("H", morningDate)).toEqual("9");
    });
    test("Should return 13 when using format: H and hour is 13", () =>{
        expect(unitTestingTask("H", afternoonDate)).toEqual("13");
    });
    test("Should return 09 when using format: hh and hour is 9", () =>{
        expect(unitTestingTask("hh", morningDate)).toEqual("09");
    });
    test("Should return 01 when using format: hh and hour is 01", () =>{
        expect(unitTestingTask("hh", afternoonDate)).toEqual("01");
    });
    test("Should return 9 when using format: h and hour is 9", () =>{
        expect(unitTestingTask("h", morningDate)).toEqual("9");
    });
    test("Should return 1 when using format: h and hour is 13", () =>{
        expect(unitTestingTask("h", afternoonDate)).toEqual("1");
    });
    test("Should return 05 when using format: mm and minute is 5", () =>{
        expect(unitTestingTask("mm", afternoonDate)).toEqual("05");
    });
    test("Should return 5 when using format: m and minute is 5", () =>{
        expect(unitTestingTask("m", afternoonDate)).toEqual("5");
    });
    test("Should return 05 when using format: ss and seconds is 5", () =>{
        expect(unitTestingTask("ss", afternoonDate)).toEqual("05");
    });
    test("Should return 5 when using format: s and second is 5", () =>{
        expect(unitTestingTask("s", afternoonDate)).toEqual("5");
    });    
    test("Should return 005 when using format: ff and milliseconds is 5", () =>{
        expect(unitTestingTask("ff", afternoonDate)).toEqual("005");
    });
    test("Should return 5 when using format: f and milliseconds is 5", () =>{
        expect(unitTestingTask("f", afternoonDate)).toEqual("5");
    });
    test("Should return AM when using format: A and it's before noon", () =>{
        expect(unitTestingTask("A", morningDate)).toEqual("AM");
    });
    test("Should return PM when using format: A and it's later than noon", () =>{
        expect(unitTestingTask("A", afternoonDate)).toEqual("PM");
    });
    test("Should return am when using format: a and it's before noon", () =>{
        expect(unitTestingTask("a", morningDate)).toEqual("am");
    });
    test("Should return pm when using format: a and it's later than noon", () =>{
        expect(unitTestingTask("a", afternoonDate)).toEqual("pm");
    });
    test("Should return the GMT Offset without ':' when using format: ZZ", () =>{
        expect(unitTestingTask("ZZ", morningDate)).toEqual(getTimezoneOffset());
    });
    test("Should return the GMT Offset with ':' when using format: Z", () =>{
        expect(unitTestingTask("Z", morningDate)).toEqual(getTimezoneOffset(true));
    });
});

describe ("Unit Testing Date Formats in Polish", () =>{
    beforeAll(()=>{
        unitTestingTask.lang('pl');
    });
    afterAll(()=>{
        unitTestingTask.lang('en');
    }); 
    test("Should return 2022 when using format: YYYY", () =>{
        expect(unitTestingTask("YYYY", morningDate)).toEqual("2022");
    });
    test("Should return 22 when using format: YY", () =>{
        expect(unitTestingTask("YY", morningDate)).toEqual("22");
    });
    test("Should return sierpeń when using format: MMMM", () =>{
        expect(unitTestingTask("MMMM", morningDate)).toEqual("sierpeń");
    });
    test("Should return 03 sierpnia when using format: DD MMMM",()=>{
        expect(unitTestingTask("dd MMMM", morningDate)).toEqual("03 sierpnia");
    })
    test("Should return sie when using format: MMM", () =>{
        expect(unitTestingTask("MMM", morningDate)).toEqual("sie");
    });
    test("Should return 08 when using format: MM", () =>{
        expect(unitTestingTask("MM", morningDate)).toEqual("08");
    });
    test("Should return środa when using format: DDD", () =>{
        expect(unitTestingTask("DDD", morningDate)).toEqual("środa");
    });
    test("Should return śr when using format: DD", () =>{
        expect(unitTestingTask("DD", morningDate)).toEqual("śr");
    });
    test("Should return Śr when using format: D", () =>{
        expect(unitTestingTask("D", morningDate)).toEqual("Śr");
    });
    test("Should return 03 when using format: dd", () =>{
        expect(unitTestingTask("dd", morningDate)).toEqual("03");
    });
    test("Should return 3 when using format: d", () =>{
        expect(unitTestingTask("d", morningDate)).toEqual("3");
    });
    test("Should return 09 when using format: HH and Hour is 9", () =>{
        expect(unitTestingTask("HH", morningDate)).toEqual("09");
    });
    test("Should return 13 when using format: HH and hour is 13", () =>{
        expect(unitTestingTask("HH", afternoonDate)).toEqual("13");
    });
    test("Should return 9 when using format: H and hour is 9" , () =>{
        expect(unitTestingTask("H", morningDate)).toEqual("9");
    });
    test("Should return 13 when using format: H and hour is 13", () =>{
        expect(unitTestingTask("H", afternoonDate)).toEqual("13");
    });
    test("Should return 09 when using format: hh and hour is 9", () =>{
        expect(unitTestingTask("hh", morningDate)).toEqual("09");
    });
    test("Should return 01 when using format: hh and hour is 01", () =>{
        expect(unitTestingTask("hh", afternoonDate)).toEqual("01");
    });
    test("Should return 9 when using format: h and hour is 9", () =>{
        expect(unitTestingTask("h", morningDate)).toEqual("9");
    });
    test("Should return 1 when using format: h and hour is 13", () =>{
        expect(unitTestingTask("h", afternoonDate)).toEqual("1");
    });
    test("Should return 05 when using format: mm and minute is 5", () =>{
        expect(unitTestingTask("mm", afternoonDate)).toEqual("05");
    });
    test("Should return 5 when using format: m and minute is 5", () =>{
        expect(unitTestingTask("m", afternoonDate)).toEqual("5");
    });
    test("Should return 05 when using format: ss and seconds is 5", () =>{
        expect(unitTestingTask("ss", afternoonDate)).toEqual("05");
    });
    test("Should return 5 when using format: s and second is 5", () =>{
        expect(unitTestingTask("s", afternoonDate)).toEqual("5");
    });    
    test("Should return 005 when using format: ff and milliseconds is 5", () =>{
        expect(unitTestingTask("ff", afternoonDate)).toEqual("005");
    });
    test("Should return 5 when using format: f and milliseconds is 5", () =>{
        expect(unitTestingTask("f", afternoonDate)).toEqual("5");
    });
    test("Should return rano when using format: A and it's before noon", () =>{
        expect(unitTestingTask("A", morningDate)).toEqual("rano");
    });
    test("Should return '' when using format: A and it's later than noon", () =>{
        expect(unitTestingTask("A", afternoonDate)).toEqual("");
    });
    test("Should return rano when using format: a and it's before noon", () =>{
        expect(unitTestingTask("a", morningDate)).toEqual("rano");
    });
    test("Should return '' when using format: a and it's later than noon", () =>{
        expect(unitTestingTask("a", afternoonDate)).toEqual("");
    });
    test("Should return the GMT Offset without ':' when using format: ZZ", () =>{
        expect(unitTestingTask("ZZ", morningDate)).toEqual(getTimezoneOffset());
    });
    test("Should return the GMT Offset with ':' when using format: Z", () =>{
        expect(unitTestingTask("Z", morningDate)).toEqual(getTimezoneOffset(true));
    });
});