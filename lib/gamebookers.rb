class Gamebookers < Celerity::Browser
  include GamebookersHelper
  SITE_URL='https://www.gamebookers.com/'

  def run
    establish_connection
    get_links_of_sports
    iterate_through_valid_sports
  end

  def establish_connection
    puts "connecting..."
    goto(SITE_URL)
  end

  #получаем весь список ссылок с видами спорта
  def get_links_of_sports
    @mainpage_links_of_sports_hrefs= div(:class, "leftNavText").ul(:index=>0).links.map &:href
  end

  #проходим по ссылке если ставки на этом виде спорта подходят.
  def iterate_through_valid_sports
    @mainpage_links_of_sports_hrefs.select do |url|
      goto(url)
      get_data(url) if validate_kind_of_bet
    end
  end


  #проверка что результат ставки на текущей странице определяется встречей, а не результатом в турнирной таблице чемпионата
  def validate_kind_of_bet
    select_lists.map(&:id).include? "presBoxSelect"
  end


  #итерируем заглядывая в каждую лигу и тип ставки
  def get_data(sport_url)
    puts "========================================================"
    puts sport_url
    goto(sport_url)
    select_leagues
  end

  #определяем тип ставки - сегодня или завтра? - такие типы ставки выкинуть.
  def today_or_tomorrow_league?
    select_list(:id, 'leaguesSelect').selected_options.to_s=~/(Today|Tomorrow)/
  end

  def write_to_file(text)
    File.open(Time.now.strftime("%d_%m_%Y.txt"), 'a') do |f|
      f.puts text
    end
  end

  def select_leagues
    puts "\e[33mLeagues:\e[0m"
    select_list_of_leagues_options=select_list(:id, 'leaguesSelect')
    puts scanleagues=select_list_of_leagues_options.options.reject { |l| l=~/(Today|Tomorrow)/ } #список лиг, без событий "сегодня или завтра", т.к они избыточны

    scanleagues.each do |league|
      puts "going in: "+ league
      option_index=select_list_of_leagues_options.options.rindex(league) #определяем индекс текущей опции в оригинальном, полном списке(нужно для определения урл)
      javascript_url=select_list_of_leagues_options.option(:index, option_index).value #выдираем урл из опции
      goto javascript_url
      puts "im here,#{javascript_url}"
      parse_page if validate_kind_of_bet && bets_are_lines?
      back
    end
  end

#выбираем типы матчей, которые успешно обрабатываются.
  def bets_are_lines?
    @bet_type=select_list(:id, 'presBoxSelect').selected_options #тип ставки(Array)
    !(@bet_type&["Line", "Fight", "Matches","1X2"]).empty?
  end

  def parse_page
    puts "parsing started"
#    string_with_coefficients=table(:class_name, "bfPresEventsHolder").text
#    puts string_with_coefficients.gsub(/Win\t\nVersus\t/, "").gsub(/CEST\t\n\tWin\t/, "CEST").gsub(/(\d{1,2}\.\d\d)\s*/, '\1 ').gsub(/[a-zA-Z]\s+(\d{0,2}\.\d\d)\s+\d{0,3}\+/, ' \1').gsub(/\n[[:blank:]]+/, "\n")
    #tables_of_events= только таблицы событий, визуальные разделители выкинуты
#    tables_of_events=browser.elements_by_xpath(%Q(//table[@class="bfPresEventsHolder"]/tbody/tr/td/table)).reject { |t| t.class_name=="presTypeDiv" }
#    tables_of_events.each do |t|
#      t.each do |row|
#        if row.class_name=="tblheadslmtrbg" #обработаем время
#          process_row(row)
#        elsif row.class_name=="ltbf"
#
#        end
#      end
#    end
    odds=browser.elements_by_xpath "//a[@class='bfhref']"
    box=[] #сюда временно записываются коэф. в порядке их обработки (1й,2й) либо (1й,ничья,2й)
    odds.each do |odd|
      sides=odd.parent.parent.html.scan(/<td class="ltbf ltbfnone".*\s+([\S ]+) v ([\S ]+)/).flatten
      time=parse_date_string_to_utc(odd.parent.parent.parent.text)
      required_size= (first_x_second) ? 3 : 2 #задаем размер кол-ва ставок на 1 событие (3 ставки для 1х2)
      box<<odd.text
      if box.size==required_size
#        debugger
        coef1=box[0]
        coef2=box[required_size-1] #второй коэфициент является либо 2м(если обычная ставка) либо 3м(если 1х2) после ничьи
        draw=box[1] if first_x_second
        write_to_db(coef1, coef2, sides, time, draw)
        draw=nil #сброс значения после записи
        box=[] #TODO:delete this asap if db works
      end
    end
  end

  def first_x_second #проверяет на тип ставки 1х2 является ли текущая ею
    @bet_type.first=="1X2"
  end

  def write_to_db(coef1, coef2, sides, time, draw)
    draw||="" #чтобы не печатался nil
    puts %Q(#{coef1} #{sides[0]} VS #{sides[1]} #{coef2} #{time} draw:#{draw})
    text= %Q(#{coef1};#{sides[0]};VS;#{sides[1]};#{coef2};#{time.strftime("%Y,%m,%d,%H,%M")})
    text<<";#{draw}"
    #bookmaker=Bookmaker.where(:name => "Gamebookers.com")
#     bookmaker.bets.create(:competitor_one=>sides[0], :competitor_one_coef => box.shift,:draw => box.shift, :competitor_two => sides[1], :competitor_two_coef => box.shift, :event_date =>time)
    write_to_file(text)
  end
end