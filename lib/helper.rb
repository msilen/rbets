module GamebookersHelper
 #парсит строку в объект Time
  def parse_date_string_to_utc(str)
    raise ArgumentError, "Argument should be string" unless str.is_a? String
    parsed_array=str.scan(/\s*([0-3]\d)\s([a-zA-Z]{3})\s(\d{2})\s(\d{2}):(\d{2})\sCEST/).flatten
    raise(ArgumentError, "Wrong string, or bad method (parse_date)#{str}") unless (parsed_array.size==5)
    day, month, year, hour, min=*parsed_array
    twohours=3600*2 #разница времени UTC и CEST 2 часа
    Time.utc(("20"+year), month, day, hour, min)-twohours
  end

# Обрабатывает строку с датами событий в таблице, возвращает дату
  def process_row(row)
    string=row.td(:xpath=>".//td[@align='right']").text
    puts "Date==#{string}"
    puts "Parsed Date===#{parsed_date=parse_date_string_to_utc(string)}"
    parsed_date
  end

end
