export default function getFormatPrice(price) {

    if(price==null){
        return "N/A";
    }

    const priceInNumber = Number(price);

    if(isNaN(priceInNumber)){
        return "N/A"
    } else{
        return "LKR " + priceInNumber.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

}

//https://rhyxhxpmrpuqmrhuwqjv.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoeXhoeHBtcnB1cW1yaHV3cWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzM1NjUsImV4cCI6MjA4NzAwOTU2NX0.LQRr5Ff1gaErsi3df8Ar8iicaLWwBhObBr0Vczd8Iv4