var win = Ti.UI.createWindow();

var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

var tbl = Ti.UI.createTableView({
	minRowHeight: 70,
	selectionStyle: 'none'
});

var current_row; // this will hold the current row we swiped over, so we can reset it's state when we do any other gesture (scroll the table, swipe another row, click on another row)

var make_actions_view = function(where) { // create the actions view - the one will be revealed on swipe
	
	var view = Ti.UI.createView({
		backgroundColor: '#fff',
		height: 70
	});

	for (var i = 0; i < 6; i++) {
		view.add(Ti.UI.createImageView({
			width: 50,
			left: 10 + (50 * i),
			height: 50,
			image: 'KS_nav_ui.png',
			is_action: 'action ' + i
		}));
	};

	return view;
};

var make_content_view = function(chars) {// create the content view - the one is displayed by default

	var view = Ti.UI.createView({
		backgroundColor: '#fff',
		height: Ti.UI.SIZE
	});

	var img = Ti.UI.createImageView({
		height: 40,
		width: 40,
		left: 5,
		top: 5,
		image: 'https://si0.twimg.com/profile_images/2179402304/appc-fb_normal.png'
	});

	var label = Ti.UI.createLabel({
		text: lorem.slice(0, chars),
		top: 0,
		left: 50,
		width: 260,
		height: Ti.UI.SIZE
	});

	view.add(img);
	view.add(label);

	return view;

};



function make_data_rows() { // some stub data for the rows.
	var data = [];

	for (var i = 0; i < 15; i++) {

		var randVal = parseInt(50 + (Math.random() * (lorem.length - 50)), 10);

		var row = Ti.UI.createTableViewRow({
			height: Ti.UI.SIZE
		});

		var v1 = make_actions_view();
		row.v2 = make_content_view(randVal);
		row.add(v1);
		row.add(row.v2);

		data.push(row);
	};
	tbl.setData(data);
}

make_data_rows();


// events

tbl.addEventListener('swipe', function(e) {
	if (current_row) {
		current_row.v2.animate({
			opacity: 1,
			duration: 500
		});
	};

	current_row = e.row;
	current_row.v2.animate({
		opacity: 0,
		duration: 500
	});
});

tbl.addEventListener('scroll', function(e) {

	if (current_row) {
		current_row.v2.animate({
			opacity: 1,
			duration: 500
		});
		current_row = null;
	}
});

tbl.addEventListener('click', function(e) {
	if (e.source.is_action) {
		alert(e.source.is_action);
	} else {
		alert('row clicked');
		if (current_row) {
			current_row.v2.animate({
				opacity: 1,
				duration: 500
			},
			function(evt) {
				// Ti.API.info(current_row);
			});
			current_row = null;
		}

	}
});

win.add(tbl);
win.open();
