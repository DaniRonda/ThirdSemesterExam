import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);




@Component({
  templateUrl: 'Admin-Screen.component.html',
  styleUrls: ['Admin-Screen.component.scss'],
})

export class AdminScreenComponent implements OnInit {
  Linechart = [];

  constructor(private router: Router,) {
  }

  /*
    private calendar: HTMLElement | null;
    private date: HTMLElement | null;
    private daysContainer: HTMLElement | null;
    private prev: HTMLElement | null;
    private next: HTMLElement | null;
    private todayBtn: HTMLElement | null;
    private gotoBtn: HTMLElement | null;
    private dateInput: HTMLInputElement | null;
    private eventDay: HTMLElement | null;
    private eventDate: HTMLElement | null;
    private eventsContainer: HTMLElement | null;
    private addEventBtn: HTMLElement | null;
    private addEventWrapper: HTMLElement | null;
    private addEventCloseBtn: HTMLElement | null;
    private addEventTitle: HTMLInputElement | null;
    private addEventFrom: HTMLInputElement | null;
    private addEventTo: HTMLInputElement | null;
    private addEventSubmit: HTMLElement | null;

    private today: Date;
    private activeDay: number | undefined;
    private month: number;
    private year: number;

    private months: string[];
    private eventsArr: EventDay[];

    constructor(day: number, month: number, year: number, events: Event[]) {
      this.calendar = document.querySelector(".calendar") as HTMLElement | null;
      this.date = document.querySelector(".date") as HTMLElement | null;
      this.daysContainer = document.querySelector(".days") as HTMLElement | null;
      this.prev = document.querySelector(".prev") as HTMLElement | null;
      this.next = document.querySelector(".next") as HTMLElement | null;
      this.todayBtn = document.querySelector(".today-btn") as HTMLElement | null;
      this.gotoBtn = document.querySelector(".goto-btn") as HTMLElement | null;
      this.dateInput = document.querySelector(".date-input") as HTMLInputElement | null;
      this.eventDay = document.querySelector(".event-day") as HTMLElement | null;
      this.eventDate = document.querySelector(".event-date") as HTMLElement | null;
      this.eventsContainer = document.querySelector(".events") as HTMLElement | null;
      this.addEventBtn = document.querySelector(".add-event") as HTMLElement | null;
      this.addEventWrapper = document.querySelector(".add-event-wrapper ") as HTMLElement | null;
      this.addEventCloseBtn = document.querySelector(".close ") as HTMLElement | null;
      this.addEventTitle = document.querySelector(".event-name ") as HTMLInputElement | null;
      this.addEventFrom = document.querySelector(".event-time-from ") as HTMLInputElement | null;
      this.addEventTo = document.querySelector(".event-time-to ") as HTMLInputElement | null;
      this.addEventSubmit = document.querySelector(".add-event-btn ") as HTMLElement | null;

      this.today = new Date();
      this.activeDay = undefined;
      this.month = this.today.getMonth();
      this.year = this.today.getFullYear();

      this.months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December",
      ];

      this.eventsArr = [];
      this.getEvents();
      console.log(this.eventsArr);

      this.initCalendar();
      this.addListner();
      this.defineProperty();

      if (this.prev) {
        this.prev.addEventListener("click", this.prevMonth.bind(this));
      }

      if (this.next) {
        this.next.addEventListener("click", this.nextMonth.bind(this));
      }

      this.initCalendar();

      if (this.todayBtn) {
        this.todayBtn.addEventListener("click", () => {
          this.today = new Date();
          this.month = this.today.getMonth();
          this.year = this.today.getFullYear();
          this.initCalendar();
        });
      }
      if (this.dateInput) {
        this.dateInput.addEventListener("input", (e) => {
          const inputEvent = e as InputEvent;

          this.dateInput!.value = this.dateInput!.value.replace(/[^0-9/]/g, "");

          if (this.dateInput!.value.length === 2) {
            this.dateInput!.value += "/";
          }

          if (this.dateInput!.value.length > 7) {
            this.dateInput!.value = this.dateInput!.value.slice(0, 7);
          }

          if (inputEvent.inputType === "deleteContentBackward") {
            if (this.dateInput!.value.length === 3) {
              this.dateInput!.value = this.dateInput!.value.slice(0, 2);
            }
          }
        });
      }
      if (this.gotoBtn) {
        this.gotoBtn.addEventListener("click", () => {
          this.gotoDate();
        });
      }
      if (this.addEventBtn) {
        this.addEventBtn.addEventListener("click", () => {
          this.toggleAddEventWrapper();
        });
      }

      if (this.addEventCloseBtn) {
        this.addEventCloseBtn.addEventListener("click", () => {
          this.closeAddEventWrapper();
        });
      }

      document.addEventListener("click", (e) => {
        if (e.target !== this.addEventBtn && this.addEventWrapper && !this.addEventWrapper.contains(e.target as Node)) {
          this.closeAddEventWrapper();
        }
      });
      if (this.addEventTitle) {
        this.addEventTitle.addEventListener("input", () => {
          this.limitEventTitleLength();
        });
      }
      this.defineProperty();

      if (this.addEventFrom) {
        this.addEventFrom.addEventListener("input", () => {
          this.formatTimeInput(this.addEventFrom);
        });
      }

      if (this.addEventTo) {
        this.addEventTo.addEventListener("input", () => {
          this.formatTimeInput(this.addEventTo);
        });
      }
      if (this.addEventSubmit) {
        this.addEventSubmit.addEventListener("click", () => {
          this.handleAddEventSubmit();
        });
      }
      if (this.eventsContainer) {
        this.eventsContainer.addEventListener("click", (e) => {
          this.handleEventsContainerClick(e);
        });
      }
      this.saveEvents();
      this.getEvents();
      this.activeDay = day;
      this.month = month;
      this.year = year;
      this.eventDay = events;
    }

    private initCalendar() {
      const firstDay = new Date(this.year, this.month, 1);
      const lastDay = new Date(this.year, this.month + 1, 0);
      const prevLastDay = new Date(this.year, this.month, 0);
      const prevDays = prevLastDay.getDate();
      const lastDate = lastDay.getDate();
      const day = firstDay.getDay();
      const nextDays = 7 - lastDay.getDay() - 1;

      if (this.date && this.daysContainer) {
        this.date.innerHTML = this.months[this.month] + " " + this.year;

        let days = "";

        for (let x = day; x > 0; x--) {
          days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDate; i++) {
          //check if event is present on that day
          let event = false;
          this.eventsArr.forEach((eventObj) => {
            if (
              eventObj.day === i &&
              eventObj.month === this.month + 1 &&
              eventObj.year === this.year
            ) {
              event = true;
            }
          });
          if (
            i === new Date().getDate() &&
            this.year === new Date().getFullYear() &&
            this.month === new Date().getMonth()
          ) {
            this.activeDay = i;
            this.getActiveDay(i);
            this.updateEvents(i);
            if (event) {
              days += `<div class="day today active event">${i}</div>`;
            } else {
              days += `<div class="day today active">${i}</div>`;
            }
          } else {
            if (event) {
              days += `<div class="day event">${i}</div>`;
            } else {
              days += `<div class="day ">${i}</div>`;
            }
          }
        }

        for (let j = 1; j <= nextDays; j++) {
          days += `<div class="day next-date">${j}</div>`;
        }
        this.daysContainer.innerHTML = days;
        this.addListner();
      }
    }
    private prevMonth() {
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
      this.initCalendar();
    }

    private nextMonth() {
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
      this.initCalendar();
    }
    private addListner() {
      const days = document.querySelectorAll(".day");
      days.forEach((day) => {
        day.addEventListener("click", (e) => {
          this.getActiveDay(e.target.innerHTML);
          this.updateEvents(Number(e.target.innerHTML));
          this.activeDay = Number(e.target.innerHTML);
          //remove active
          days.forEach((day) => {
            day.classList.remove("active");
          });
          //if clicked prev-date or next-date switch to that month
          if (e.target.classList.contains("prev-date")) {
            this.prevMonth();
            //add active to clicked day afte month is change
            setTimeout(() => {
              //add active where no prev-date or next-date
              const days = document.querySelectorAll(".day");
              days.forEach((day) => {
                if (
                  !day.classList.contains("prev-date") &&
                  day.innerHTML === e.target.innerHTML
                ) {
                  day.classList.add("active");
                }
              });
            }, 100);
          } else if (e.target.classList.contains("next-date")) {
            this.nextMonth();
            //add active to clicked day afte month is changed
            setTimeout(() => {
              const days = document.querySelectorAll(".day");
              days.forEach((day) => {
                if (
                  !day.classList.contains("next-date") &&
                  day.innerHTML === e.target.innerHTML
                ) {
                  day.classList.add("active");
                }
              });
            }, 100);
          } else {
            e.target.classList.add("active");
          }
        });
      });
    }
    private gotoDate() {
      console.log("here");
      const dateArr = this.dateInput?.value.split("/");
      if (dateArr && dateArr.length === 2) {
        const monthValue = parseInt(dateArr[0], 10);  // or Number(dateArr[0])
        if (monthValue > 0 && monthValue < 13 && dateArr[1].length === 4) {
          this.month = monthValue - 1;
          this.year = Number(dateArr[1]);
          this.initCalendar();
          return;
        }
      }
      alert("Invalid Date");
    }
    private getActiveDay(date: number) {
      const day = new Date(this.year, this.month, date);
      const dayName = day.toString().split(" ")[0];
      if (this.eventDay) {
        this.eventDay.innerHTML = dayName;
      }
      if (this.eventDate) {
        this.eventDate.innerHTML = date + " " + this.months[this.month] + " " + this.year;
      }
    }
    private updateEvents(date: number | undefined) {
      let events = "";
      this.eventsArr.forEach((event) => {
        if (
          date === event.day &&
          this.month + 1 === event.month &&
          this.year === event.year
        ) {
          event.events.forEach((event: { title: any; time: any; }) => {
            events += `<div class="event">
              <div class="title">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${event.title}</h3>
              </div>
              <div class="event-time">
                <span class="event-time">${event.time}</span>
              </div>
          </div>`;
          });
        }
      });
      if (events === "") {
        events = `<div class="no-event">
              <h3>No Events</h3>
          </div>`;
      }
      if (this.eventsContainer) {
        this.eventsContainer.innerHTML = events;
      }
      this.saveEvents();
    }
    private toggleAddEventWrapper() {
      if (this.addEventWrapper) {
        this.addEventWrapper.classList.toggle("active");
      }
    }

    private closeAddEventWrapper() {
      if (this.addEventWrapper) {
        this.addEventWrapper.classList.remove("active");
      }
    }
    private limitEventTitleLength() {
      if (this.addEventTitle) {
        this.addEventTitle.value = this.addEventTitle.value.slice(0, 60);
      }
    }
    private defineProperty() {
      const osccred = document.createElement("div");
      osccred.style.position = "absolute";
      osccred.style.bottom = "0";
      osccred.style.right = "0";
      osccred.style.fontSize = "10px";
      osccred.style.color = "#ccc";
      osccred.style.fontFamily = "sans-serif";
      osccred.style.padding = "5px";
      osccred.style.background = "#fff";
      osccred.style.borderTopLeftRadius = "5px";
      osccred.style.borderBottomRightRadius = "5px";
      osccred.style.boxShadow = "0 0 5px #ccc";
      document.body.appendChild(osccred);
    }

    private formatTimeInput(input: HTMLInputElement | null) {
      if (input) {
        input.value = input.value.replace(/[^0-9:]/g, "");
        if (input.value.length === 2) {
          input.value += ":";
        }
        if (input.value.length > 5) {
          input.value = input.value.slice(0, 5);
        }
      }
    }
    private handleAddEventSubmit() {
      if (this.addEventTitle && this.addEventFrom && this.addEventTo) {
        const eventTitle = this.addEventTitle.value;
        const eventTimeFrom = this.addEventFrom.value;
        const eventTimeTo = this.addEventTo.value;

        if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
          alert("Please fill all the fields");
          return;
        }

        // Check correct time format 24 hour
        const timeFromArr = eventTimeFrom.split(":");
        const timeToArr = eventTimeTo.split(":");
        if (
          timeFromArr.length !== 2 ||
          timeToArr.length !== 2 ||
          +timeFromArr[0] > 23 ||
          +timeFromArr[1] > 59 ||
          +timeToArr[0] > 23 ||
          +timeToArr[1] > 59
        ) {
          alert("Invalid Time Format");
          return;
        }

        const timeFrom = this.convertTime(eventTimeFrom);
        const timeTo = this.convertTime(eventTimeTo);

        // Check if event is already added
        let eventExist = false;
        this.eventsArr.forEach((event) => {
          if (
            event.day === this.activeDay &&
            event.month === this.month + 1 &&
            event.year === this.year
          ) {
            event.events.forEach((event: { title: string; time: any; }) => {
              if (event.title === eventTitle) {
                eventExist = true;
              }
            });
          }
        });

        if (eventExist) {
          alert("Event already added");
          return;
        }

        const newEvent: { time: string; title: string } = {
          title: eventTitle,
          time: timeFrom + " - " + timeTo,
        };

        let eventAdded = false;
        if (this.eventsArr.length > 0) {
          this.eventsArr.forEach((item) => {
            if (
              item.day === this.activeDay &&
              item.month === this.month + 1 &&
              item.year === this.year
            ) {
              item.events.push(<EventDay>newEvent);
              eventAdded = true;
            }
          });
        }

        if (!eventAdded) {
          this.eventsArr.push(<EventDay><unknown>{
            day: this.activeDay,
            month: this.month + 1,
            year: this.year,
            events: [newEvent],
          });
        }

        if (this.addEventWrapper) {
          this.addEventWrapper.classList.remove("active");
        }

        if (this.addEventTitle) {
          this.addEventTitle.value = "";
        }

        if (this.addEventFrom) {
          this.addEventFrom.value = "";
        }

        if (this.addEventTo) {
          this.addEventTo.value = "";
        }

        this.updateEvents(this.activeDay);

        // Select active day and add event class if not added
        const activeDayEl = document.querySelector(".day.active");
        if (activeDayEl && !activeDayEl.classList.contains("event")) {
          activeDayEl.classList.add("event");
        }
      }
    }
    private handleEventsContainerClick(e: MouseEvent) {
      if (e.target instanceof Element && e.target.classList.contains("event")) {
        if (confirm("Are you sure you want to delete this event?")) {
          const eventTitle = e.target.querySelector(".event-title")?.innerHTML;

          this.eventsArr.forEach((event) => {
            if (
              event.day === this.activeDay &&
              event.month === this.month + 1 &&
              event.year === this.year
            ) {
              event.events.forEach((item: { title: string | undefined; }, index: any) => {
                if (item.title === eventTitle) {
                  event.events.splice(index, 1);
                }
              });

              // If no events left in a day then remove that day from eventsArr
              if (event.events.length === 0) {
                this.eventsArr.splice(this.eventsArr.indexOf(event), 1);

                // Remove event class from day
                const activeDayEl = document.querySelector(".day.active");
                if (activeDayEl && activeDayEl.classList.contains("event")) {
                  activeDayEl.classList.remove("event");
                }
              }
            }
          });

          this.updateEvents(this.activeDay);
        }
      }
    }
    private saveEvents() {
      localStorage.setItem("events", JSON.stringify(this.eventsArr));
    }
    private getEvents() {
      // Check if events are already saved in local storage, then return events; otherwise, do nothing
      const storedEvents = localStorage.getItem("events");
      if (storedEvents) {
        this.eventsArr.push(...JSON.parse(storedEvents));
      }
    }
    private convertTime(time: string): string {
      // Convert time to 24-hour format
      const timeArr = time.split(":");
      const timeHour = timeArr[0];
      const timeMin = timeArr[1];

      return `${timeHour}:${timeMin}`;
    }
  */


  openUsers() {
    this.router.navigate(['AdminUserScreen']);
  }

  openHistory() {
    this.router.navigate(['AdminHistoryScreen']);
  }

  logout() {
    this.router.navigate(['home']);
  }


  ngOnInit() {
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
          '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        datasets: [{
          label: 'Total Orders',
          data: [11, 22, 14, 11, 16, 16, 8, 12, 16, 4, 8, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        },
          {
            label: 'WackCheese Orders',
            data: [8, 15, 7, 2, 10, 6],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'BigWack Orders',
            data: [3, 7, 7, 9, 6, 10],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
interface EventDay {
  day: number;
  month: number;
  year: number;
  events: EventDay[];
}

// Assuming 'Event' is another interface or type
interface Event {
  title: string;
  time: string;



}


