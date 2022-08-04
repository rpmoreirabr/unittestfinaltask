const unitTestingTask = require("../unitTestingTask");
var morningDate = "2022-08-03T09:30:30.030";
var afternoonDate = "2022-08-03T13:05:05.005"

describe("Alternative flows unit Testing", () =>{
    test("Using not supported lang", () =>{
        unitTestingTask.lang('pt-br');
        expect(unitTestingTask("YY/M/D", morningDate)).toEqual("22/8/We");
    });
    test("Format is not a string", () =>{
        expect(() => { unitTestingTask(1234, morningDate)}).toThrow(new TypeError('Argument `format` must be a string'));
    });
    test("Date is a object", () =>{
        var date = new Object() 
        expect(() => { unitTestingTask("DD/MM/YYYY", date) }).toThrow(new TypeError('Argument `date` must be instance of Date or Unix Timestamp or ISODate String'));
    });
});

describe ("Unit Testing Date Formats", () =>{
    test("Format: YYYY", () =>{
        expect(unitTestingTask("YYYY", morningDate)).toEqual("2022");
    });
    test("Format: YY", () =>{
        expect(unitTestingTask("YY", morningDate)).toEqual("22");
    });
    test("Format: MMMM", () =>{
        expect(unitTestingTask("MMMM", morningDate)).toEqual("August");
    });
    test("Format: MMM", () =>{
        expect(unitTestingTask("MMM", morningDate)).toEqual("Aug");
    });
    test("Format: MM", () =>{
        expect(unitTestingTask("MM", morningDate)).toEqual("08");
    });
    test("Format: DDD", () =>{
        expect(unitTestingTask("DDD", morningDate)).toEqual("Wednesday");
    });
    test("Format: DD", () =>{
        expect(unitTestingTask("DD", morningDate)).toEqual("Wed");
    });
    test("Format: D", () =>{
        expect(unitTestingTask("D", morningDate)).toEqual("We");
    });
    test("Format: dd", () =>{
        expect(unitTestingTask("dd", morningDate)).toEqual("03");
    });
    test("Format: d", () =>{
        expect(unitTestingTask("d", morningDate)).toEqual("3");
    });
    test("Format: HH", () =>{
        expect(unitTestingTask("HH", morningDate)).toEqual("09");
        expect(unitTestingTask("HH", afternoonDate)).toEqual("13");
    });
    test("Format: H", () =>{
        expect(unitTestingTask("H", morningDate)).toEqual("9");
        expect(unitTestingTask("HH", afternoonDate)).toEqual("13");
    });
    test("Format: hh", () =>{
        expect(unitTestingTask("hh", morningDate)).toEqual("09");
        expect(unitTestingTask("hh", afternoonDate)).toEqual("01");
    });
    test("Format: h", () =>{
        expect(unitTestingTask("h", morningDate)).toEqual("9");
        expect(unitTestingTask("h", afternoonDate)).toEqual("1");
    });
    test("Format: mm", () =>{
        expect(unitTestingTask("mm", morningDate)).toEqual("30");
        expect(unitTestingTask("mm", afternoonDate)).toEqual("05");
    });
    test("Format: m", () =>{
        expect(unitTestingTask("m", morningDate)).toEqual("30");
        expect(unitTestingTask("m", afternoonDate)).toEqual("5");
    });
    test("Format: ss", () =>{
        expect(unitTestingTask("ss", morningDate)).toEqual("30");
        expect(unitTestingTask("ss", afternoonDate)).toEqual("05");
    });
    test("Format: s", () =>{
        expect(unitTestingTask("s", morningDate)).toEqual("30");
        expect(unitTestingTask("s", afternoonDate)).toEqual("5");
    });    
    test("Format: ff", () =>{
        expect(unitTestingTask("ff", morningDate)).toEqual("030");
        expect(unitTestingTask("ff", afternoonDate)).toEqual("005");
    });
    test("Format: f", () =>{
        expect(unitTestingTask("f", morningDate)).toEqual("30");
        expect(unitTestingTask("f", afternoonDate)).toEqual("5");
    });
    test("Format: A", () =>{
        expect(unitTestingTask("A", morningDate)).toEqual("AM");
        expect(unitTestingTask("A", afternoonDate)).toEqual("PM");
    });
    test("Format: a", () =>{
        expect(unitTestingTask("a", morningDate)).toEqual("am");
        expect(unitTestingTask("a", afternoonDate)).toEqual("pm");
    });
    test("Format: ZZ", () =>{
        expect(unitTestingTask("ZZ", morningDate)).toEqual("+0200");
        expect(unitTestingTask("ZZ", afternoonDate)).toEqual("+0200");
    });
    test("Format: Z", () =>{
        expect(unitTestingTask("Z", morningDate)).toEqual("+02:00");
        expect(unitTestingTask("Z", afternoonDate)).toEqual("+02:00");
    });
});

describe ("Unit Testing Date Formats in Polish", () =>{
    beforeAll(()=>{
        unitTestingTask.lang('pl');
    });
    afterAll(()=>{
        unitTestingTask.lang('en');
    }); 
    test("Format: YYYY", () =>{
        expect(unitTestingTask("YYYY", morningDate)).toEqual("2022");
    });
    test("Format: YY", () =>{
        expect(unitTestingTask("YY", morningDate)).toEqual("22");
    });
    test("Format: MMMM", () =>{
        expect(unitTestingTask("MMMM", morningDate)).toEqual("sierpeń");
        expect(unitTestingTask("dd MMMM", morningDate)).toEqual("03 sierpnia");
    });
    test("Format: MMM", () =>{
        expect(unitTestingTask("MMM", morningDate)).toEqual("sie");
    });
    test("Format: MM", () =>{
        expect(unitTestingTask("MM", morningDate)).toEqual("08");
    });
    test("Format: DDD", () =>{
        expect(unitTestingTask("DDD", morningDate)).toEqual("środa");
    });
    test("Format: DD", () =>{
        expect(unitTestingTask("DD", morningDate)).toEqual("śr");
    });
    test("Format: D", () =>{
        expect(unitTestingTask("D", morningDate)).toEqual("Śr");
    });
    test("Format: dd", () =>{
        expect(unitTestingTask("dd", morningDate)).toEqual("03");
    });
    test("Format: d", () =>{
        expect(unitTestingTask("d", morningDate)).toEqual("3");
    });
    test("Format: HH", () =>{
        expect(unitTestingTask("HH", morningDate)).toEqual("09");
        expect(unitTestingTask("HH", afternoonDate)).toEqual("13");
    });
    test("Format: H", () =>{
        expect(unitTestingTask("H", morningDate)).toEqual("9");
        expect(unitTestingTask("HH", afternoonDate)).toEqual("13");
    });
    test("Format: hh", () =>{
        expect(unitTestingTask("hh", morningDate)).toEqual("09");
        expect(unitTestingTask("hh", afternoonDate)).toEqual("01");
    });
    test("Format: h", () =>{
        expect(unitTestingTask("h", morningDate)).toEqual("9");
        expect(unitTestingTask("h", afternoonDate)).toEqual("1");
    });
    test("Format: mm", () =>{
        expect(unitTestingTask("mm", morningDate)).toEqual("30");
        expect(unitTestingTask("mm", afternoonDate)).toEqual("05");
    });
    test("Format: m", () =>{
        expect(unitTestingTask("m", morningDate)).toEqual("30");
        expect(unitTestingTask("m", afternoonDate)).toEqual("5");
    });
    test("Format: ss", () =>{
        expect(unitTestingTask("ss", morningDate)).toEqual("30");
        expect(unitTestingTask("ss", afternoonDate)).toEqual("05");
    });
    test("Format: s", () =>{
        expect(unitTestingTask("s", morningDate)).toEqual("30");
        expect(unitTestingTask("s", afternoonDate)).toEqual("5");
    });    
    test("Format: ff", () =>{
        expect(unitTestingTask("ff", morningDate)).toEqual("030");
        expect(unitTestingTask("ff", afternoonDate)).toEqual("005");
    });
    test("Format: f", () =>{
        expect(unitTestingTask("f", morningDate)).toEqual("30");
        expect(unitTestingTask("f", afternoonDate)).toEqual("5");
    });
    test("Format: A", () =>{
        expect(unitTestingTask("A", morningDate)).toEqual("rano");
        expect(unitTestingTask("A", afternoonDate)).toEqual("");
    });
    test("Format: a", () =>{
        expect(unitTestingTask("a", morningDate)).toEqual("rano");
        expect(unitTestingTask("a", afternoonDate)).toEqual("");
    });
    test("Format: ZZ", () =>{
        expect(unitTestingTask("ZZ", morningDate)).toEqual("+0200");
        expect(unitTestingTask("ZZ", afternoonDate)).toEqual("+0200");
    });
    test("Format: Z", () =>{
        expect(unitTestingTask("Z", morningDate)).toEqual("+02:00");
        expect(unitTestingTask("Z", afternoonDate)).toEqual("+02:00");
    });
});