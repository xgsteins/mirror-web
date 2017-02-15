---
---
$(document).ready(() => {
	var mir_tmpl = $("#template").text();

	// $.get("/static/status/disk.json", (d) => {
	// 	var used_percent = Math.round(d.used_kb * 100 / d.total_kb);
	// 	$('#disk-usage-bar')
	// 		.attr("aria-valuenow", used_percent)
	// 		.css("width", used_percent + "%")
	// 		.html("<strong>" + d.used_readable + " / " + d.total_readable + "</strong>");
	// });

	window.refreshMirrorList = () => {
		$.getJSON("/static/mirrordsync.json", (status_data) => {
			var mirrors=[], mir_data=status_data;
			for(var k in mir_data) {
				var d = mir_data[k];
				d.name=k;
				if(d.status==2&& d.exitcode==0){
					d.status='success'
				}else if(d.status==2&&d.exitcode!=0){
					d.status='failed'
				}else if(d.status==1&&d.exitcode==0){
					d.status='syncing'
				}
				if (d.is_master === undefined) {
					d.is_master = true;
				}
				// Strip the second component of last_update
				d.last_update = d.date;
				mirrors.push(d);
			}
			var result = Mark.up(mir_tmpl, {mirrors: mirrors});
			$('#mirror-list').html(result);
		});
		setTimeout(refreshMirrorList, 10000);
	};
	refreshMirrorList();
});
