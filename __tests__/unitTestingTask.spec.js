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
    test("It should return date in english when trying to use pt-br language.", () =>{
        unitTestingTask.lang('pt-br');
        expect(unitTestingTask("YY/M/D", morningDate)).toEqual("22/8/We");
    });
    test("It should raise an exception when format is 1234.", () =>{
        expect(() => { unitTestingTask(1234, morningDate)}).toThrow(new TypeError('Argument `format` must be a string'));
    });
    test("It should raise an excepetion when date is a new object", () =>{
        var date = new Object() 
        expect(() => { unitTestingTask("DD/MM/YYYY", date) }).toThrow(new TypeError('Argument `date` must be instance of Date or Unix Timestamp or ISODate String'));
    });
});

describe ("Unit Testing all date formats", () =>{
    test("It should return 2022 when using format: YYYY", () =>{
        expect(unitTestingTask("YYYY", morningDate)).toEqual("2022");
    });
    test("It should return 22 when using format: YY", () =>{
        expect(unitTestingTask("YY", morningDate)).toEqual("22");
    });
    test("It should return August when using format: MMMM", () =>{
        expect(unitTestingTask("MMMM", morningDate)).toEqual("August");
    });
    test("It should return Aug when using format: MMM", () =>{
        expect(unitTestingTask("MMM", morningDate)).toEqual("Aug");
    });
    test("It should return 08 when using format: MM", () =>{
        expect(unitTestingTask("MM", morningDate)).toEqual("08");
    });
    test("It should return Wednesday when using format: DDD", () =>{
        expect(unitTestingTask("DDD", morningDate)).toEqual("Wednesday");
    });
    test("It should return Wed when using format: DD", () =>{
        expect(unitTestingTask("DD", morningDate)).toEqual("Wed");
    });
    test("It should return We when using format: D", () =>{
        expect(unitTestingTask("D", morningDate)).toEqual("We");
    });
    test("It should return 03 when using format: dd", () =>{
        expect(unitTestingTask("dd", morningDate)).toEqual("03");
    });
    test("It should return 3 when using format: d", () =>{
        expect(unitTestingTask("d", morningDate)).toEqual("3");
    });
    test("It should return 09 when using format: HH and Hour is 9", () =>{
        expect(unitTestingTask("HH", morningDate)).toEqual("09");
    });
    test("It should return 13 when using format: HH and hour is 13", () =>{
        expect(unitTestingTask("HH", afternoonDate)).toEqual("13");
    });
    test("It should return 9 when using format: H and hour is 9" , () =>{
        expect(unitTestingTask("H", morningDate)).toEqual("9");
    });
    test("It should return 13 when using format: H and hour is 13", () =>{
        expect(unitTestingTask("H", afternoonDate)).toEqual("13");
    });
    test("It should return 09 when using format: hh and hour is 9", () =>{
        expect(unitTestingTask("hh", morningDate)).toEqual("09");
    });
    test("It should return 01 when using format: hh and hour is 01", () =>{
        expect(unitTestingTask("hh", afternoonDate)).toEqual("01");
    });
    test("It should return 9 when using format: h and hour is 9", () =>{
        expect(unitTestingTask("h", morningDate)).toEqual("9");
    });
    test("It should return 1 when using format: h and hour is 13", () =>{
        expect(unitTestingTask("h", afternoonDate)).toEqual("1");
    });
    test("It should return 05 when using format: mm and minute is 5", () =>{
        expect(unitTestingTask("mm", afternoonDate)).toEqual("05");
    });
    test("It should return 5 when using format: m and minute is 5", () =>{
        expect(unitTestingTask("m", afternoonDate)).toEqual("5");
    });
    test("It should return 05 when using format: ss and seconds is 5", () =>{
        expect(unitTestingTask("ss", afternoonDate)).toEqual("05");
    });
    test("It should return 5 when using format: s and second is 5", () =>{
        expect(unitTestingTask("s", afternoonDate)).toEqual("5");
    });    
    test("It should return 005 when using format: ff and milliseconds is 5", () =>{
        expect(unitTestingTask("ff", afternoonDate)).toEqual("005");
    });
    test("It should return 5 when using format: f and milliseconds is 5", () =>{
        expect(unitTestingTask("f", afternoonDate)).toEqual("5");
    });
    test("It should return AM when using format: A and it's before noon", () =>{
        expect(unitTestingTask("A", morningDate)).toEqual("AM");
    });
    test("It should return PM when using format: A and it's later than noon", () =>{
        expect(unitTestingTask("A", afternoonDate)).toEqual("PM");
    });
    test("It should return am when using format: a and it's before noon", () =>{
        expect(unitTestingTask("a", morningDate)).toEqual("am");
    });
    test("It should return pm when using format: a and it's later than noon", () =>{
        expect(unitTestingTask("a", afternoonDate)).toEqual("pm");
    });
    test("It should return the GMT Offset without ':' when using format: ZZ", () =>{
        expect(unitTestingTask("ZZ", morningDate)).toEqual(getTimezoneOffset());
    });
    test("It should return the GMT Offset with ':' when using format: Z", () =>{
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
    test("It should return 2022 when using format: YYYY", () =>{
        expect(unitTestingTask("YYYY", morningDate)).toEqual("2022");
    });
    test("It should return 22 when using format: YY", () =>{
        expect(unitTestingTask("YY", morningDate)).toEqual("22");
    });
    test("It should return sierpeń when using format: MMMM", () =>{
        expect(unitTestingTask("MMMM", morningDate)).toEqual("sierpeń");
    });
    test("It should return 03 sierpnia when using format: DD MMMM",()=>{
        expect(unitTestingTask("dd MMMM", morningDate)).toEqual("03 sierpnia");
    })
    test("It should return sie when using format: MMM", () =>{
        expect(unitTestingTask("MMM", morningDate)).toEqual("sie");
    });
    test("It should return 08 when using format: MM", () =>{
        expect(unitTestingTask("MM", morningDate)).toEqual("08");
    });
    test("It should return środa when using format: DDD", () =>{
        expect(unitTestingTask("DDD", morningDate)).toEqual("środa");
    });
    test("It should return śr when using format: DD", () =>{
        expect(unitTestingTask("DD", morningDate)).toEqual("śr");
    });
    test("It should return Śr when using format: D", () =>{
        expect(unitTestingTask("D", morningDate)).toEqual("Śr");
    });
    test("It should return 03 when using format: dd", () =>{
        expect(unitTestingTask("dd", morningDate)).toEqual("03");
    });
    test("It should return 3 when using format: d", () =>{
        expect(unitTestingTask("d", morningDate)).toEqual("3");
    });
    test("It should return 09 when using format: HH and Hour is 9", () =>{
        expect(unitTestingTask("HH", morningDate)).toEqual("09");
    });
    test("It should return 13 when using format: HH and hour is 13", () =>{
        expect(unitTestingTask("HH", afternoonDate)).toEqual("13");
    });
    test("It should return 9 when using format: H and hour is 9" , () =>{
        expect(unitTestingTask("H", morningDate)).toEqual("9");
    });
    test("It should return 13 when using format: H and hour is 13", () =>{
        expect(unitTestingTask("H", afternoonDate)).toEqual("13");
    });
    test("It should return 09 when using format: hh and hour is 9", () =>{
        expect(unitTestingTask("hh", morningDate)).toEqual("09");
    });
    test("It should return 01 when using format: hh and hour is 01", () =>{
        expect(unitTestingTask("hh", afternoonDate)).toEqual("01");
    });
    test("It should return 9 when using format: h and hour is 9", () =>{
        expect(unitTestingTask("h", morningDate)).toEqual("9");
    });
    test("It should return 1 when using format: h and hour is 13", () =>{
        expect(unitTestingTask("h", afternoonDate)).toEqual("1");
    });
    test("It should return 05 when using format: mm and minute is 5", () =>{
        expect(unitTestingTask("mm", afternoonDate)).toEqual("05");
    });
    test("It should return 5 when using format: m and minute is 5", () =>{
        expect(unitTestingTask("m", afternoonDate)).toEqual("5");
    });
    test("It should return 05 when using format: ss and seconds is 5", () =>{
        expect(unitTestingTask("ss", afternoonDate)).toEqual("05");
    });
    test("It should return 5 when using format: s and second is 5", () =>{
        expect(unitTestingTask("s", afternoonDate)).toEqual("5");
    });    
    test("It should return 005 when using format: ff and milliseconds is 5", () =>{
        expect(unitTestingTask("ff", afternoonDate)).toEqual("005");
    });
    test("It should return 5 when using format: f and milliseconds is 5", () =>{
        expect(unitTestingTask("f", afternoonDate)).toEqual("5");
    });
    test("It should return rano when using format: A and it's before noon", () =>{
        expect(unitTestingTask("A", morningDate)).toEqual("rano");
    });
    test("It should return '' when using format: A and it's later than noon", () =>{
        expect(unitTestingTask("A", afternoonDate)).toEqual("");
    });
    test("It should return rano when using format: a and it's before noon", () =>{
        expect(unitTestingTask("a", morningDate)).toEqual("rano");
    });
    test("It should return '' when using format: a and it's later than noon", () =>{
        expect(unitTestingTask("a", afternoonDate)).toEqual("");
    });
    test("It should return the GMT Offset without ':' when using format: ZZ", () =>{
        expect(unitTestingTask("ZZ", morningDate)).toEqual(getTimezoneOffset());
    });
    test("It should return the GMT Offset with ':' when using format: Z", () =>{
        expect(unitTestingTask("Z", morningDate)).toEqual(getTimezoneOffset(true));
    });
});