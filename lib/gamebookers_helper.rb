module GamebookersHelper
  #парсит входящую строку в объект Time
  def parse_date_string_to_utc(str)
    raise ArgumentError, "Argument should be string" unless str.is_a? String
    parsed_array=str.scan(/\s*([0-3]\d)\s([a-zA-Z]{3})\s(\d{2})\s(\d{2}):(\d{2})\s(CEST|CET)/).flatten
    raise(ArgumentError, "Wrong string, or bad method (parse_date)#{str}") unless (parsed_array.size==6)
    day, month, year, hour, min=*parsed_array
    hour_difference=parsed_array[5]=="CEST" ? (3600*2):(3600) #разница времени UTC и CEST 2 часа, UTC и CET 1 час
    Time.utc(("20"+year), month, day, hour, min)-hour_difference
  end

  def reject_redundant_today_options(select_list)
    select_list.options.reject { |l| l=~/(Today|Tomorrow)/ } #список лиг, без событий "сегодня или завтра", т.к они избыточны
  end

  #возвращает урл выбранной опции из списка Select List
  def league_url(league, select_list_of_leagues)
    option_index=select_list_of_leagues.options.rindex(league) #определяем индекс текущей опции в оригинальном, полном списке(нужно для определения урл)
    select_list_of_leagues.option(:index, option_index).value #выдираем урл из опции
  end

  #определяем, обрабатывается ли данный тип ставок
  def appropriate_bet_type?
    @bet_type=select_list(:id, 'presBoxSelect').selected_options #тип ставки(Array)
    !(@bet_type&["Line", "Fight", "Matches", "1X2"]).empty?
  end

  def first_x_second(odds) #проверяет на тип ставки 1х2 является ли текущая ею
#переменная определяется - делим общее число ставок на кол-во событий, если 3 - то тип ставки 1Х2
    events_count=elements_by_xpath("//td[@class='ltbf ltbfnone']").size
    @first_x_second=(odds.size/events_count)==3
  end

    #определяем тип ставки - сегодня или завтра? - такие типы ставки выкинуть.
  def today_or_tomorrow_league?
    select_list(:id, 'leaguesSelect').selected_options.to_s=~/(Today|Tomorrow)/
  end

    #проверка что результат ставки на текущей странице определяется встречей, а не результатом в турнирной таблице чемпионата
  def page_with_actual_matches?
    select_lists.map(&:id).include? "presBoxSelect"
  end

  #на вход принимает объект-ссылку коэффициент, возвращает массив соперников, к которым она относится
  def find_sides(odd)
    odd.parent.parent.html.scan(/<td class="ltbf ltbfnone".*\s+([\S ]+) v ([\S ]+)/).flatten
  end

  #вырезает из строки часть, заключенную в квадратные скобки
  def strip_brackets(string)
    string.gsub(/(.*)\[.+\]/, '\1')
  end
end
