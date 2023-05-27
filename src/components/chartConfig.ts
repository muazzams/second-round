import api from "../api";

let kkCount = 0;
let rteCount = 0;
let invalidCount = 0;

await api.get("bullet-box/all/count").then((res) => {
  console.log("abidino")
  kkCount = res?.data?.kkCount;
  rteCount = res?.data?.rteCount;
  invalidCount = res?.data?.invalidCount;
});

export const data = {
    labels: ['Kemal Kılıçdaroğlu', 'Recep Tayyip Erdoğan', 'Geçersiz'],
    datasets: [
      {
        backgroundColor: ['#FF5733', '#DFA921', '#2141DF'],
        data: [kkCount, rteCount, invalidCount]
      }
    ]
  }
  
  export const options = {
    responsive: false,
    maintainAspectRatio: false
  }
  