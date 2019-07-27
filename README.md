###### tags: `Tech`

# 7/28 fesp backend study group

---

## Relational DB

---

什麼是關聯式資料庫 ?

一組資料項目，項目之間具有預先定義的關係。這些項目會整理成由直欄和橫列構成的一組表格。表格會儲存資料庫中所要表示的物件的相關資訊。表格的每一直欄儲存特定類型的資料，而每個欄位儲存某個屬性的實際數值。

---

Amazon Aurora , Oracle , SQL Server , MySQL , PostgreSQL , MariaDB

---

![](https://i.imgur.com/QXfpGHh.png)

---

![](https://i.imgur.com/L2hwgZz.png)

---

### Relational DB 重點

---

SQL 查詢 : 

美國國家標準協會 (ANSI) 在 1986 年將 SQL 納入標準。所有常見的關聯式資料庫引擎都支援標準 ANSI SQL 。

---

![](https://i.imgur.com/moQK389.png)

---

資料完整性 : 

利用一套限制條件讓資料庫達成資料完整性。其中包括主索引鍵、外部索引鍵、「非空白值」限制條件、「唯一」限制條件、「預設」限制條件、「檢查」限制條件

---

![](https://i.imgur.com/BWkTfwk.png)

---

交易處理 : 

指透過一連串的操作執行的一或多個 SQL 陳述式，形成單一邏輯工作單位。交易的原則是「全有或全無」。結果包括「認可」(COMMIT) 或「轉返」(ROLLBACK)。

---

![](https://i.imgur.com/2iAd6HT.png)

---

[ACID](https://zh.wikipedia.org/wiki/ACID) 合規 : 

* 不可分割性 (Atomic)
* 一致性 (Consistent)
* 獨立性 (Independent)
* 耐用性 (Durable)

來確保資料完整

---

![](https://i.imgur.com/WL5Gdzl.png)

---

### Mysql

---

關聯式資料庫管理系統，因為以前是apache的時代，所以非常非常非常非常多 Web 應用程式在使用它。

![](https://i.imgur.com/lBZ3CxL.png)

---

第一步驟 : 建立 DB & 使用 DB

---

```sql=
Create database testDB;
use testDB;
```

---

第二步驟 : 畫畫 schema & 新建 Table

---

![](https://i.imgur.com/ln1YV8O.png =600x200)

---

```sql=
CREATE TABLE customer_info
(
    customer_id     varchar(10) Not null UNIQUE,
    customer_name   varchar(50) Not null
)
CREATE TABLE product_info
(
    product_id      varchar(10) Not null UNIQUE,
    product_name    varchar(50) Not null,
    product_price   int         Not null
)
CREATE TABLE order_info
(
    order_number    varchar(10) Not null,
    product_id      varchar(10) Not null,
    order_date      date        Not null,
    customer_id     varchar(10) Not null,
    order_value     float       Not null
)
```

---

這樣好像缺少了連動性，造成更改使用者編號的時候訂單無法同步更新或是要手動更新 ( 麻煩 )，因此我們可以加入 Constraint 

---

Create Constraint
```sql=
ALTER TABLE order_info ADD CONSTRAINT FOREIGN KEY (product_id) REFERENCES product_info(product_id)
ON UPDATE CASCADE; 

ALTER TABLE order_info ADD CONSTRAINT FOREIGN KEY (customer_id) REFERENCES customer_info(customer_id)
ON UPDATE CASCADE ON DELETE CASCADE;
```

---

第三步驟 : 操作資料庫 !

---

找許小姐資料 : 
```sql=
SELECT * FROM customer_info WHERE customer_name = '許小姐'
```
![](https://i.imgur.com/vwWZu6u.png)

---

找蘋果價格 : 
```sql=
SELECT product_price FROM product_info WHERE product_name = '蘋果'
```
![](https://i.imgur.com/bjhg1N0.png)

---

查陳先生買東西資料 : 
```sql=
SELECT * FROM order_info JOIN customer_info JOIN product_info WHERE order_info.customer_id = customer_info.customer_id AND order_info.product_id = product_info.product_id AND customer_info.customer_name = '陳先生'
```
![](https://i.imgur.com/nFdfmw5.png)

---

## RESTAPI

---

REST其實是縮寫，它當然不是休息的意思，RESTful 也不是翻寧靜式 !!
不過在介紹 REST API 之前，我們得先回去複習 HTTP 協定

---

在HTTP協定中，定義了多種不同的method做為服務的請求方法，近年來由於行動裝置的普及化，越來越多的產品及網站，都提供了WebAPI服務，因此身為程式設計師的我們，在設計API為主的Web服務時，對於HTTP請求方式的認知，更是相當重要。

---

### API ?

---

![](https://i.imgur.com/hbykxCP.jpg =500x400)

---

### WEB 框架中的 API

---

簡單說，就是透過 Server 對外開的『窗口』做不同的 Method 來對同一件事情做不同的操作。

---

![](https://i.imgur.com/IO9fGtQ.png)


---

* GET：取得型錄，了解想要找的鞋子、型號、規格等。
* POST／PUT：呼叫店員協助幫忙找鞋子，並買到想要的鞋子。
* PATCH：結帳後向店員更換尺寸或加價購買其他配件如鞋帶、襪子等。
* DELETE：跟店員說我不要了。

---

* GET：取得(想要的服務)的資料或是狀態。（safe & idempotent）
* POST：新增一項資料。
* PUT：利用更新的方式於"指定位置"新增一項資料。 （idempotent）
* PATCH：在現有的資料欄位中，增加或部分更新一筆新的資料。
* DELETE：指定資料刪除。 （idempotent）

---

![](https://i.imgur.com/pRbyuWQ.png)

safe : 可否快取 , idempotent : 同個時間點做幾次都一樣

---

利用safe & idempotent特性，不妨可以思考看看 : 

訂閱該用 put 還是 post 呢 ?

---

那 put 和 patch 到底有什麼差別 ?

---

put   : 可以想像是 重新提交表單 ，如果不存在就新增，存在就替換 (所有欄位)

patch : 修改表單某個欄位

---

但是其實 put 和 patch 上面的說法也只是RFC5789的定義，怎麼實作還是看後端的部分要怎麼寫 (考試還是要照教科書啦...)

---

那到底 REST 在 REST 什麼東西呢 ?

---

所以如果我們以電腦操作檔案來譬喻

POST  : 建立一個新檔案是 

PATCH : 修改檔案是

PUT   : 從別的地方複製檔案貼上就是 (無論你貼上幾次都是同一個檔案)

當然Web API沒有一定要照著上面的定義敘述建立，但如果你符合的話，你可以將它稱作Restful API。

---

REST指的是網路中Client端和Server端的一種呼叫服務形式，透過既定的規則，滿足約束條件和原則的應用程式設計，對資源的操作包括獲取、創建、修改和刪除資源，這些操作就是依照我們前面所提到的HTTP Method: GET、POST、PUT、PATCH和DELETE。這正好會對應到資料庫基本操作CRUD。

---

C : Create 
R : Read
U : Update
D : Delete

---

讓我們繼續舉例子區分一下 WEB API & REST API

---

首先是WEB API : 

獲得商品資料 GET   /getAllItems
獲得商品資料 GET   /getItem/11
新增商品資料 POST  /createItem
更新商品資料 POST  /updateItem/
刪除商品資料 POST  /deleteItem/

---

若是以使用 RESTful API 開發的話:

獲取商品資料 GET    /items
獲取商品資料 GET    /items/1
新增商品資料 POST   /items
更新商品資料 PATCH  /items/1 
刪除商品資料 DELETE /items/1

---

## 實作時間

---

預計使用技術 : mysqli , postman , express

測試 API 工具 : Postman

後端 API : 

1. 用以下的專案連結中的 mysqli 寫出一個簡易訂單系統，要能新增使用者、下訂單
2. API 如下 :  
      /user/:id : patch,delete 
      /items : get,post


---

Homework 新增資料 query : 

```sql
INSERT INTO `customer_info` (`customer_id`, `customer_name`) VALUES ('C023', '陳先生'), ('C051', '許小姐');
```
```sql
INSERT INTO `product_info` (`product_id`, `product_name`, `product_price`) VALUES ('f01', '香蕉', '5'), ('f02', '哈密瓜', '20'), ('f03', '蘋果', '50');
```
```sql
INSERT INTO `order_info` (`order_number`, `product_id`, `order_date`, `customer_id`, `order_value`) VALUES ('d0001', 'f01', '2019-07-27', 'C023', '5'), ('d0001', 'f02', '2019-07-27', 'C023', '10'), ('d0002', 'f01', '2019-07-27', 'C051', '2'), ('d0003', 'f03', '2019-07-27', 'C051', '4');
```
UPDATE 範例 : 
https://www.1keydata.com/tw/sql/sqlupdate.html
DELETE 範例 : 
https://www.1keydata.com/tw/sql/sqldelete.html
---

reference : 
[AWS RDB](https://aws.amazon.com/tw/relational-database/)
[Web API](https://progressbar.tw/posts/53)
[ACID](https://zh.wikipedia.org/wiki/ACID)
[safe idempotent](https://ihower.tw/blog/archives/6483)
