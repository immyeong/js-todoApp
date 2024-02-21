## Todo App 구현

### javascript
 - input 요소와 button 요소, div 요소에 접근하여 createElement메서드를 사용하여 요소 생성
 - 각 요소마다 event 부여
  - inputEl
    -> text에 input 시 item객체에 input.text를 푸쉬
    -> blur 시 disabled Attribute생성하여 더이상 접근 못하게하고 데이터 저장
    -> enter 키 누를 시 blur와 같은 효과를 주고 데이터 저장
  - checkboxEl 
    -> checkbox.checked메서드를 활용하여 true일 때 
    css 효과를 주고 edit 버튼을 disabled하게 하고, false 일 때 원래대로 돌리고 edit 버튼을 abled하게 함

  - editEl 
    -> click 시 input요소에 접근을 못하도록 diabled 추가
  - removeEl
    -> click 시 todos 리스트에 filter 메소드를 사용해서 리스트 요소를 확인하며 불일치하는 것을 filter하고(없앰) , 아이템요소에서 remove함

  -window.localStorage 활용

   -------localStorage에 저장 ----------
   - JSON.stringifty 메서드를 활용하여 todos 리스트 값을 json형식으로 바꿔줌
   -바뀐 리스트 값을 setItem 메서드를 활용하여 localStorage에 저장

   -------localStorage에서 데이터 가져오기--------

   -localStorage에 JSON형식으로 된 데이터 JSON.parse메서드를 사용하여 다시 object로 바꿔서 가져옴

   -------todos에 넣은 데이터를 화면에 송출---------
   
   - 화면에 보여줄 때마다 Todo 리스트를 순회하며 데이터 값들을 리스트에 추가함

