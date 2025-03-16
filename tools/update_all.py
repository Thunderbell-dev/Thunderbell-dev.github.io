from update_affiliates import affiliates_update
# from update_header_footer import
from update_news import news_update
from update_guides import update_guides

print(f"Update Affiliates {'-'*50}")

affiliates_update()

print(f"Update Header & Footer {'-'*45}")


print(f"Update News {'-'*56}")

news_update()

print(f"Update Guides {'-'*56}")

update_guides()