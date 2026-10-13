// danh sach ve may bay
const tickets = [
  {
    pnr: "VN1001",
    name: "Nguyen Van An",
    flight: "VN202",
    seat: "12A",
    ticketClass: "ECONOMY",
    baggage: 0,
    status: "BOOKED",
  },
  {
    pnr: "VN1002",
    name: "Tran Thi Binh",
    flight: "VN305",
    seat: "05B",
    ticketClass: "BUSINESS",
    baggage: 0,
    status: "BOOKED",
  },
  {
    pnr: "VN1003",
    name: "Le Van Cuong",
    flight: "VN202",
    seat: "15C",
    ticketClass: "ECONOMY",
    baggage: 0,
    status: "BOOKED",
  },
];

const FEE_PER_KG = 50000;

// tim ve theo ma PNR
function findTicketByPnr(pnr) {
  return tickets.find((ticket) => ticket.pnr === pnr);
}

// tinh phi hanh ly qua can
function calculateExcessBaggageFee(ticketClass, baggageWeight) {
  let freeWeight = 20;

  if (ticketClass === "BUSINESS") {
    freeWeight = 30;
  }

  let excessWeight = Math.max(0, baggageWeight - freeWeight);

  return {
    excessWeight: excessWeight,
    fee: excessWeight * FEE_PER_KG,
  };
}

// hien thi danh sach ve
function listTickets() {
  console.log("\n========== DANH SACH VE MAY BAY ==========");
  console.log(
    "PNR".padEnd(10) +
      "TEN KHACH".padEnd(22) +
      "CHUYEN BAY".padEnd(13) +
      "HANG VE".padEnd(12) +
      "TRANG THAI",
  );

  tickets.forEach((ticket) => {
    console.log(
      ticket.pnr.padEnd(10) +
        ticket.name.padEnd(22) +
        ticket.flight.padEnd(13) +
        ticket.ticketClass.padEnd(12) +
        ticket.status,
    );
  });
}

// xuat the len may bay
function displayBoardingPass(ticket, baggageWeight, fee) {
  console.log("\n========== BOARDING PASS ==========");
  console.log("Ma dat cho: " + ticket.pnr);
  console.log("Hanh khach: " + ticket.name);
  console.log("Chuyen bay: " + ticket.flight);
  console.log("Ghe ngoi: " + ticket.seat);
  console.log("Hang ve: " + ticket.ticketClass);
  console.log("Hanh ly: " + baggageWeight + " kg");
  console.log("Phi qua can: " + fee.toLocaleString("vi-VN") + " VND");
  console.log("Trang thai: " + ticket.status);
  console.log("===================================");
}

// check-in hanh khach
function checkIn() {
  let pnr = prompt("Nhap ma PNR:");

  if (pnr === null) {
    return;
  }

  pnr = pnr.trim().toUpperCase();

  if (!/^[A-Z0-9]{5,10}$/.test(pnr)) {
    console.log("Ma PNR khong hop le!");
    return;
  }

  let ticket = findTicketByPnr(pnr);

  if (!ticket) {
    console.log("Khong tim thay ve!");
    return;
  }

  if (ticket.status !== "BOOKED") {
    console.log("Ve khong the check-in. Trang thai: " + ticket.status);
    return;
  }

  let inputWeight = prompt("Nhap can nang hanh ly (kg):");

  if (inputWeight === null || inputWeight.trim() === "") {
    console.log("Da huy thao tac check-in!");
    return;
  }

  let baggageWeight = Number(inputWeight);

  if (!Number.isFinite(baggageWeight) || baggageWeight < 0) {
    console.log("Can nang hanh ly phai la so khong am!");
    return;
  }

  let result = calculateExcessBaggageFee(ticket.ticketClass, baggageWeight);

  console.log("Hanh ly qua can: " + result.excessWeight + " kg");
  console.log("Phi qua can: " + result.fee.toLocaleString("vi-VN") + " VND");

  let confirmCheckIn = prompt("Xac nhan check-in? (Y/N)");

  if (confirmCheckIn === null || confirmCheckIn.trim().toUpperCase() !== "Y") {
    console.log("Da huy thao tac check-in!");
    return;
  }

  ticket.baggage = baggageWeight;
  ticket.status = "CHECKED_IN";

  displayBoardingPass(ticket, baggageWeight, result.fee);
}

// tra cuu ve theo PNR hoac ten
function searchTicket() {
  let keyword = prompt("Nhap ma PNR hoac ten hanh khach:");

  if (keyword === null || keyword.trim() === "") {
    console.log("Du lieu tim kiem khong hop le!");
    return;
  }

  keyword = keyword.trim().toLowerCase();

  let foundTickets = tickets.filter(
    (ticket) =>
      ticket.pnr.toLowerCase() === keyword ||
      ticket.name.toLowerCase().includes(keyword),
  );

  if (foundTickets.length === 0) {
    console.log("Khong tim thay ve!");
    return;
  }

  foundTickets.forEach((ticket) => {
    console.log(
      "PNR: " +
        ticket.pnr +
        " | Ten: " +
        ticket.name +
        " | Chuyen bay: " +
        ticket.flight +
        " | Ghe: " +
        ticket.seat +
        " | Trang thai: " +
        ticket.status,
    );
  });
}

// huy ve may bay
function cancelTicket() {
  let pnr = prompt("Nhap ma PNR can huy:");

  if (pnr === null) {
    return;
  }

  pnr = pnr.trim().toUpperCase();

  if (!/^[A-Z0-9]{5,10}$/.test(pnr)) {
    console.log("Ma PNR khong hop le!");
    return;
  }

  let ticket = findTicketByPnr(pnr);

  if (!ticket) {
    console.log("Khong tim thay ve!");
    return;
  }

  if (ticket.status === "CANCELLED") {
    console.log("Ve nay da duoc huy truoc do!");
    return;
  }

  let confirmCancel = prompt("Xac nhan huy ve " + pnr + "? (Y/N)");

  if (confirmCancel === null || confirmCancel.trim().toUpperCase() !== "Y") {
    console.log("Da huy thao tac!");
    return;
  }

  ticket.status = "CANCELLED";
  console.log("Huy ve thanh cong!");
}

// menu chinh
function main() {
  let menuChoice;

  do {
    console.log("\n========== QUAN LY CHECK-IN ==========");
    console.log("1. Hien thi danh sach ve");
    console.log("2. Check-in hanh khach");
    console.log("3. Tra cuu ve");
    console.log("4. Huy ve");
    console.log("5. Thoat chuong trinh");
    console.log("======================================");

    let input = prompt("Nhap lua chon (1-5):");

    if (input === null) {
      menuChoice = "5";
    } else {
      menuChoice = input.trim();
    }

    switch (menuChoice) {
      case "1":
        listTickets();
        break;

      case "2":
        checkIn();
        break;

      case "3":
        searchTicket();
        break;

      case "4":
        cancelTicket();
        break;

      case "5":
        console.log("Da thoat chuong trinh!");
        break;

      default:
        console.log("Lua chon khong hop le! Vui long nhap 1-5.");
    }
  } while (menuChoice !== "5");
}

// chay chuong trinh
main();
