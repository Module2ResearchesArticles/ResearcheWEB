document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

tinymce.init({
    selector: '#mytextarea',
    plugins: "print  lists",
    height: 300,
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    toolbar: 'undo redo | bold italic | fontsizeselect | alignleft aligncenter alignright alignjustify alignnone| bullist numlist | indent outdent'
    // menubarus: "file",
    // toolbar: "print"
  });

M.AutoInit();