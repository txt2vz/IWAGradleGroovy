import org.apache.tika.Tika

File f = new File(/C:\Users\Laurie\Dropbox\cloud\IWA\Labs\d3.docx/)
Tika tika = new Tika()
tika.setMaxStringLength(100)
println tika.parseToString(f)
