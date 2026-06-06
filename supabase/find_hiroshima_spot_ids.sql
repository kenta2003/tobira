-- 広島県の history スポット ID を確認する
select id, name, address
from spots
where prefecture = 'Hiroshima'
  and 'history' = any(categories)
order by name;
