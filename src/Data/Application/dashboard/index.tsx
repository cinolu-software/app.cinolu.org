import { AdmissionRatioChart, DailyOrderChart, DailyRevenueChart, OrderValueChart } from "@/Data/General/Widgets/General";

export const AdminData = [
    {
        class: "total-sells",
        title: "Admission Ratio",
        image: "coin1.png",
        count: "12,463",
        icon: "fa-arrow-up",
        color: "success",
        percentage: "+ 20.08%",
        detail: "Compared to Jan 2023",
        chartId: "admissionRatio",
        chart: AdmissionRatioChart,
    },
    {
        class: "total-sells-2",
        title: "Order Value",
        image: "shopping1.png",
        count: "78,596",
        icon: "fa-arrow-down",
        color: "danger",
        percentage: "- 10.02%",
        detail: "Compared to Aug 2023",
        chartId: "order-value",
        chart: OrderValueChart,
    },
    {
        class: "total-sells-3",
        title: "Daily Order",
        image: "sent1.png",
        count: "95,789",
        icon: "fa-arrow-up",
        color: "success",
        percentage: "+ 13.23%",
        detail: "Compared to may 2023",
        chartId: "daily-value",
        chart: DailyOrderChart,
    },
    {
        class: "total-sells-4",
        title: "Daily Revenue",
        image: "revenue1.png",
        count: "95,789",
        icon: "fa-arrow-down",
        color: "danger",
        percentage: "- 17.06%",
        detail: "Compared to july 2023",
        chartId: "daily-revenue",
        chart: DailyRevenueChart,
    },
];