document.addEventListener('click', async (event) => {
  // 1. Проверяем клик: ищем либо элемент с классом .button, 
  // либо с классами f-b-t-b-c / f-b-t-b-c-tr (которые были без класса .button)
  const button = event.target.closest('.button, .f-b-t-b-c, .f-b-t-b-c-tr');
  if (!button) return;

  // 2. Ищем родительский элемент с классом .copy (он же имеет класс .ff)
  const card = button.closest('.copy');
  if (!card) return;

  // 3. Чтобы не скопировать текст вместе с цифрой внутри самой кнопки:
  // Клонируем элемент, удаляем из клона кнопку и забираем только чистый текст
  const cardClone = card.cloneNode(true);
  const buttonInsideClone = cardClone.querySelector('.button, .f-b-t-b-c, .f-b-t-b-c-tr');
  if (buttonInsideClone) {
    buttonInsideClone.remove();
  }
  
  // Берем чистый текст и обрезаем лишние пробелы/переносы строк по краям
  const textToCopy = cardClone.innerText.trim();

  // 4. Механизм копирования (универсальный для любых сред)
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      throw new Error();
    }
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  // 5. Визуальный отклик на кнопке
//   const originalText = button.innerText;
//   button.innerText = "✓";

  setTimeout(() => {
    button.innerText = originalText;
  }, 2000);
});