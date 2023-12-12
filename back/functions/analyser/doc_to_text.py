from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter

 #extract text from pdf https://pypi.org/project/PyPDF2/
def get_pdf_text(document):
    text = ""
   
    for pdf in document:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extractText()
        return text

#creation list of text chunks
def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
    separator = "\n",
    chunk_size = 1000,
    chunk_overlap=200,
    length_function=len
    )
    chunks = text_splitter.split(text)

