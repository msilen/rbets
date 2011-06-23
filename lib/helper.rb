module GamebookersHelper
  def self.parse_date_string_to_utc(str)
    parsed_array=str.scan(/\s*([0-3]\d)\s([a-zA-Z]{3})\s(\d{2})\s(\d{2}):(\d{2})\sCEST/).flatten
    day,month,year,hour,min=*parsed_array
    Time.utc(("20"+year),month,day,(hour.to_i-2),min)
  end

end
