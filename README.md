Hướng dẫn chạy:

1 npm i

2 npm start

3 open localhost:3000
/////////////////////////////////////////////////////////
-> npm init

-> npm install express

-> n👉 npm install --save body-parser@1.19.0 dotenv@8.2.0 ejs@3.1.5 express@4.18.2

👉 npm install --save-dev @babel/core@7.12.10 @babel/preset-env@7.12.10
@babel/node@7.12.10 nodemon@2.0.7

=> config src
=> create gitignore
=> config babel
=> create a basic express app

-> cái @babel/cli là để "thực hiện việc chyển đổi chỉ với dăm ba câu lệnh đơn giản"
-> cái @babel/polyfill cung cấp cho Babel có khả năng convert code cho cả browser cổ đại cũng hiểu.
-> cái @babel/core là nền tảng để tháo lắp các "phụ kiện" một cách linh hoạt. Trong đó, các "phụ kiện" bao gồm: @babel/preset-env để convert từ ES5++ về ES5 @babel/babel-preset-react để convert JS của React về ES5 @babel/preset-typescript để convert Typescript về Javascript ES5 ... Như vậy, nếu bạn cần chuyển đổi script gì đó sang Javascript ES5, đơn giản chỉ cần cài thêm "phụ kiện" cho Babel hoạt động, rất nhẹ nhàng và không tốn mồ hôi.

> > body-parser: lấy dữ liệu từ httpnpm install --save body-parser
