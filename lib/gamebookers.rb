class Gamebookers < Celerity::Browser
  SITE_URL='https://www.gamebookers.com/'
  VALID_SPORTS=
      %w(https://www.gamebookers.com/bets.ap?sportName=american-football&sport=5426
		https://www.gamebookers.com/bets.ap?sportName=baseball&sport=5425
		https://www.gamebookers.com/bets.ap?sportName=basketball&sport=5422
		https://www.gamebookers.com/bets.ap?sportName=boxing-%26-mma&sport=15400
		https://www.gamebookers.com/bets.ap?sportName=cricket&sport=15440
		https://www.gamebookers.com/bets.ap?sportName=football&sport=3893
		https://www.gamebookers.com/bets.ap?sportName=golf&sport=15444
		https://www.gamebookers.com/bets.ap?sportName=tennis&sport=4259
		https://www.gamebookers.com/bets.ap?sportName=volleyball&sport=15450])


  def run
    establish_connection
    #		get_list_of_links
    #		get_valid_sports
    get_data
  end

  def establish_connection
    puts "connecting..."
    goto(SITE_URL)
  end

  def get_list_of_links
    @mainpage_links_hrefs= div(:class, "leftNavText").ul(:index=>0).links.map &:href
  end

  def get_valid_sports
    valid_sports=@mainpage_links_hrefs.select do |url|
      goto(url)
      validate_kind_of_bet
    end
    puts valid_sports
    valid_sports
  end

  def validate_kind_of_bet
    select_lists.map(&:id).include? "presBoxSelect"
  end


  #итерируем весь список подходящих видов спорта, заглядывая в каждую лигу и тип ставки
  def get_data
    VALID_SPORTS.each do |sport_url|
      puts "========================================================"
      puts sport_url
      goto(sport_url)
      select_leagues
      parse_page if bets_are_lines? && !today_or_tomorrow_league?
    end
  end

  def today_or_tomorrow_league?
    select_list(:id, 'leaguesSelect').selected_options.to_s=~/(Today|Tomorrow)/
  end


  def select_leagues
    puts "\e[33mLeagues:\e[0m"
    slist=select_list(:id, 'leaguesSelect')
    puts leagues=slist.options.reject{|l|l=~/(Today|Tomorrow)/}

    leagues.each do |league|
      puts "going in: "+ league
      debugger
      slist.option(:text, league).select
      puts "im here"
      parse_page if validate_kind_of_bet && bets_are_lines?
      back
    end
  end

  def bets_are_lines?
    select_list(:id, 'presBoxSelect').selected_options.include?("Line")
  end

  def parse_page
    puts "parsing started"
    string_with_coefficients=table(:class_name, "bfPresEventsHolder").text
    puts string_with_coefficients.gsub(/Win\t\nVersus\t/, "").gsub(/CEST\t\n\tWin\t/, "CEST").gsub(/(\d{1,2}\.\d\d)\s*/, '\1 ').gsub(/[a-zA-Z]\s+(\d{0,2}\.\d\d)\s+\d{0,3}\+/, ' \1').gsub(/\n[[:blank:]]+/, "\n")
  end


end